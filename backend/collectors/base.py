"""Base collector class for all data sources."""

import logging
from datetime import datetime
from abc import ABC, abstractmethod
from sqlalchemy.orm import Session
from database.models import CollectionLog

logger = logging.getLogger(__name__)


class BaseCollector(ABC):
    """Base class for all data collectors."""

    name: str = "base"

    def __init__(self, session: Session):
        self.session = session
        self.records_added = 0
        self.records_updated = 0

    @abstractmethod
    async def collect(self):
        """Override this method to implement data collection."""
        pass

    async def run(self):
        """Execute the collector with logging and error handling."""
        log = CollectionLog(
            collector_name=self.name,
            started_at=datetime.utcnow(),
            status="running",
        )
        self.session.add(log)
        self.session.commit()

        try:
            logger.info(f"[{self.name}] Starting collection...")
            await self.collect()

            log.status = "success"
            log.records_added = self.records_added
            log.records_updated = self.records_updated
            log.completed_at = datetime.utcnow()
            self.session.commit()

            logger.info(
                f"[{self.name}] Complete: {self.records_added} added, "
                f"{self.records_updated} updated"
            )

        except Exception as e:
            log.status = "error"
            log.error_message = str(e)[:2000]
            log.completed_at = datetime.utcnow()
            self.session.commit()
            logger.error(f"[{self.name}] Failed: {e}")
            raise
