"""Back-populate the Category graph from existing Brand.category strings.

Move #1 of the data-platform extension (2026-06-05): turns the flat
`brands.category` string into first-class Category entities linked via
BrandCategory. Idempotent — safe to re-run.

Run:  python -m database.backfill_categories     (from backend/)
"""

import re
import sys

from config import get_settings
from database.models import (
    get_engine, get_session_factory, create_tables,
    Brand, Category, BrandCategory,
)


def slugify(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", name.strip().lower()).strip("-")


def run():
    settings = get_settings()
    engine = get_engine(settings.database_url)
    create_tables(engine)  # ensure new tables exist
    Session = get_session_factory(engine)
    db = Session()

    cats_created = links_created = 0
    try:
        # distinct, non-empty category strings on brands
        raw = {
            (b.category or "").strip()
            for b in db.query(Brand.category).distinct()
            if (b.category or "").strip()
        }

        # name -> Category (create if missing)
        cat_by_name = {}
        for name in sorted(raw):
            slug = slugify(name)
            cat = db.query(Category).filter(Category.name == name).first()
            if not cat:
                cat = Category(name=name, slug=slug)
                db.add(cat)
                db.flush()
                cats_created += 1
            cat_by_name[name] = cat

        # link every brand to its category
        for brand in db.query(Brand).all():
            name = (brand.category or "").strip()
            if not name:
                continue
            cat = cat_by_name.get(name)
            if not cat:
                continue
            exists = db.query(BrandCategory).filter_by(
                brand_id=brand.id, category_id=cat.id
            ).first()
            if not exists:
                db.add(BrandCategory(brand_id=brand.id, category_id=cat.id, is_primary=True))
                links_created += 1

        db.commit()
        print(f"[backfill_categories] categories created: {cats_created}, "
              f"brand→category links created: {links_created}")
    except Exception as exc:  # noqa: BLE001
        db.rollback()
        print(f"[backfill_categories] ERROR: {exc}", file=sys.stderr)
        raise
    finally:
        db.close()


if __name__ == "__main__":
    run()
