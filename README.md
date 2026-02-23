# Liquid Economy Intelligence Platform

Independent data intelligence for global beverage alcohol markets. Built for Palmer Liquid Studios.

## Quick Start (Local Development)

### Prerequisites
- Python 3.11+
- Node.js 20+
- PostgreSQL 16+ (or Docker)

### Option A: Docker Compose (recommended)
```bash
docker compose up -d
```
This starts PostgreSQL, the API backend, and the React frontend. Access:
- Dashboard: http://localhost:5173
- API: http://localhost:8000
- API docs: http://localhost:8000/docs

### Option B: Manual Setup
```bash
# 1. Start PostgreSQL
# 2. Backend
cd backend
cp .env.example .env   # Edit with your values
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# 3. Frontend
cd frontend
npm install
npm run dev
```

### Default Login
- Username: `palmer`
- Password: `liquidstudios2026`

(Change these in `.env` before deploying)

## Deploying to Railway

1. Push this repo to GitHub
2. Go to [railway.app](https://railway.app) and create a new project
3. Add a PostgreSQL database service
4. Connect your GitHub repo
5. Set environment variables (see `.env.example`)
6. Railway will auto-deploy on push

Estimated cost: ~$20/month (Hobby plan + managed Postgres)

## Architecture

```
Data Sources (10+ APIs) → Python Collectors → PostgreSQL → FastAPI → React Dashboard
                                                              ↓
                                                     Excel/PDF Export
```

### Automated Data Sources (Tier 1)
| Source | Frequency | Data |
|--------|-----------|------|
| Yahoo Finance | Daily | Stock prices, P/E ratios, market caps |
| SEC EDGAR | Daily | 10-K, 10-Q, 8-K filings |
| BLS PPI | Monthly | Glass, spirits, wine, beer cost indices |
| USITC DataWeb | Monthly | HS code trade volumes |
| UK Companies House | Weekly | Private company financials |
| Eurostat Comext | Monthly | EU trade data |

### Dashboard Pages
1. **Command Centre** — Key metrics, alerts, upcoming events
2. **Valuations & Arbitrage** — P/E tracking, arbitrage signals
3. **Brand Pricing** — 41 brands × 4 markets with premium index
4. **Companies** — 20 company profiles with brands and filings

## API Endpoints

- `POST /api/auth/login` — Authenticate
- `GET /api/dashboard/summary` — Command centre data
- `GET /api/dashboard/valuations` — P/E history
- `GET /api/dashboard/arbitrage` — Active signals
- `GET /api/companies/` — Company list
- `GET /api/companies/{id}` — Company detail
- `GET /api/companies/pricing/all` — All brand pricing
- `GET /api/exports/excel` — Download Excel tracker
- `POST /api/collectors/run/{name}` — Trigger collector manually
