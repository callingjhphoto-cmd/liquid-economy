"""Terminal API — vertical category views, the per-brand bespoke terminal,
and the creative-brief feed.

Move #3 of the data-platform extension (2026-06-05): the first endpoints of the
sellable, purpose-built-per-brand product layer.
"""

import json
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session

from database.models import (
    Brand, Category, BrandCategory, CreativeBrief, Client, BrandTemplate,
)

router = APIRouter(prefix="/api/terminal", tags=["terminal"])


def get_db():
    """Dependency — overridden by main app via dependency_overrides."""
    pass


def _brand_dict(b: Brand):
    return {
        "id": b.id, "brand": b.brand_name, "expression": b.expression,
        "category": b.category, "owner": b.brand_owner, "company_id": b.company_id,
    }


# ── Vertical: categories as first-class entities ──

@router.get("/categories")
def list_categories(db: Session = Depends(get_db)):
    """Every category with its brand count — the 'map of the market'."""
    rows = (
        db.query(Category.id, Category.name, Category.slug,
                 func.count(BrandCategory.brand_id).label("brand_count"))
        .outerjoin(BrandCategory, BrandCategory.category_id == Category.id)
        .group_by(Category.id)
        .order_by(func.count(BrandCategory.brand_id).desc())
        .all()
    )
    return [{"id": r.id, "name": r.name, "slug": r.slug, "brand_count": r.brand_count} for r in rows]


@router.get("/categories/{category_id}/brands")
def category_brands(category_id: int, db: Session = Depends(get_db)):
    """All brands in a category (the vertical database view)."""
    brands = (
        db.query(Brand)
        .join(BrandCategory, BrandCategory.brand_id == Brand.id)
        .filter(BrandCategory.category_id == category_id)
        .order_by(Brand.brand_name)
        .all()
    )
    return [_brand_dict(b) for b in brands]


# ── The data → creative feed ──

@router.get("/briefs")
def list_briefs(status: Optional[str] = None, limit: int = 50, db: Session = Depends(get_db)):
    """Creative briefs raised by the Sentinels — the Know-it → Make-it feed."""
    q = db.query(CreativeBrief).order_by(CreativeBrief.created_at.desc())
    if status:
        q = q.filter(CreativeBrief.status == status)
    return [
        {
            "id": cb.id, "status": cb.status, "signal": cb.source_signal,
            "brand_id": cb.brand_id, "category_id": cb.category_id,
            "headline": cb.headline, "analyst_summary": cb.analyst_summary,
            "creative_challenge": cb.creative_challenge, "severity": cb.severity,
            "triggering_data": json.loads(cb.triggering_data) if cb.triggering_data else None,
            "created_at": cb.created_at.isoformat() if cb.created_at else None,
        }
        for cb in q.limit(limit).all()
    ]


# ── The bespoke per-brand terminal (the product) ──

@router.get("/{client_id}")
def client_terminal(client_id: int, db: Session = Depends(get_db)):
    """Return the bespoke terminal config for one client — same engine, purpose-built view."""
    client = db.query(Client).filter(Client.id == client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    t = client.template
    if not t:
        return {"client": {"id": client.id, "name": client.name, "status": client.status},
                "template": None, "message": "No brand template configured yet."}

    focus = db.query(Brand).filter(Brand.id == t.focus_brand_id).first() if t.focus_brand_id else None
    comp_ids = json.loads(t.competitor_brand_ids) if t.competitor_brand_ids else []
    competitors = db.query(Brand).filter(Brand.id.in_(comp_ids)).all() if comp_ids else []
    category = db.query(Category).filter(Category.id == t.focus_category_id).first() if t.focus_category_id else None

    return {
        "client": {"id": client.id, "name": client.name, "status": client.status},
        "focus_brand": _brand_dict(focus) if focus else None,
        "category": {"id": category.id, "name": category.name} if category else None,
        "competitors": [_brand_dict(b) for b in competitors],
        "markets": json.loads(t.focus_markets) if t.focus_markets else [],
        "config": json.loads(t.config) if t.config else {},
    }
