"""Liquid Economy Intelligence Platform — FastAPI Application."""

import logging
from contextlib import asynccontextmanager
from datetime import timedelta

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger

from config import get_settings
from auth import authenticate_user, create_access_token, get_current_user
from database.models import get_engine, get_session_factory, create_tables, Base
from database.seed import run_seed
from api.dashboard import router as dashboard_router
from api.companies import router as companies_router
from api.exports import router as exports_router

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(name)s] %(levelname)s: %(message)s")
logger = logging.getLogger(__name__)

settings = get_settings()
engine = get_engine(settings.database_url)
SessionLocal = get_session_factory(engine)

scheduler = AsyncIOScheduler()


# ── Database dependency ──

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ── Scheduled collector jobs ──

async def run_yahoo_finance():
    from collectors.yahoo_finance import YahooFinanceCollector
    db = SessionLocal()
    try:
        collector = YahooFinanceCollector(db)
        await collector.run()
    finally:
        db.close()


async def run_bls_ppi():
    from collectors.bls_ppi import BLSPPICollector
    db = SessionLocal()
    try:
        collector = BLSPPICollector(db, api_key=settings.bls_api_key)
        await collector.run()
    finally:
        db.close()


async def run_sec_edgar():
    from collectors.sec_edgar import SECEdgarCollector
    db = SessionLocal()
    try:
        collector = SECEdgarCollector(db, user_agent=settings.sec_user_agent)
        await collector.run()
    finally:
        db.close()


# ── App lifecycle ──

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting Liquid Economy Intelligence Platform...")
    create_tables(engine)
    run_seed(settings.database_url)

    # Schedule collectors
    scheduler.add_job(run_yahoo_finance, CronTrigger.from_crontab(settings.schedule_yahoo_finance),
                      id="yahoo_finance", replace_existing=True)
    scheduler.add_job(run_bls_ppi, CronTrigger.from_crontab(settings.schedule_bls_ppi),
                      id="bls_ppi", replace_existing=True)
    scheduler.add_job(run_sec_edgar, CronTrigger.from_crontab(settings.schedule_sec_edgar),
                      id="sec_edgar", replace_existing=True)
    scheduler.start()
    logger.info("Scheduler started with collectors registered")

    yield

    # Shutdown
    scheduler.shutdown()
    logger.info("Platform shut down")


# ── App ──

app = FastAPI(
    title="Liquid Economy Intelligence",
    version="1.0.0",
    description="Independent data intelligence for global beverage alcohol markets",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Override get_db in routers ──

dashboard_router.dependencies = []
companies_router.dependencies = []
exports_router.dependencies = []

# Monkey-patch the get_db dependency in each router module
import api.dashboard as dash_mod
import api.companies as comp_mod
import api.exports as exp_mod

dash_mod.get_db = get_db
comp_mod.get_db = get_db
exp_mod.get_db = get_db

app.include_router(dashboard_router)
app.include_router(companies_router)
app.include_router(exports_router)


# ── Auth endpoints ──

class LoginRequest(BaseModel):
    username: str
    password: str


@app.post("/api/auth/login")
async def login(request: LoginRequest):
    if not authenticate_user(request.username, request.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    token = create_access_token(data={"sub": request.username})
    return {"access_token": token, "token_type": "bearer"}


@app.get("/api/auth/me")
async def get_me(username: str = Depends(get_current_user)):
    return {"username": username}


# ── Manual collector triggers ──

@app.post("/api/collectors/run/{collector_name}")
async def trigger_collector(collector_name: str, username: str = Depends(get_current_user)):
    """Manually trigger a collector run."""
    runners = {
        "yahoo_finance": run_yahoo_finance,
        "bls_ppi": run_bls_ppi,
        "sec_edgar": run_sec_edgar,
    }

    if collector_name not in runners:
        raise HTTPException(status_code=404, detail=f"Unknown collector: {collector_name}")

    try:
        await runners[collector_name]()
        return {"status": "success", "collector": collector_name}
    except Exception as e:
        return {"status": "error", "collector": collector_name, "error": str(e)}


@app.get("/api/health")
async def health():
    return {
        "status": "healthy",
        "app": settings.app_name,
        "version": settings.app_version,
    }
