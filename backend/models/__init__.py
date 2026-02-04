import uuid
from datetime import datetime, timezone

from sqlalchemy import UUID, Column, DateTime, func
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class BaseModel(Base):
    __abstract__ = True

    created_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        server_default=func.now(),
        nullable=False,
    )
    updated_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        server_default=func.now(),
        nullable=False,
    )


class DeletableModel(BaseModel):
    __abstract__ = True

    deleted_at = Column(DateTime, nullable=True)


class UUIDModel:
    __abstract__ = True

    uuid = Column(UUID(as_uuid=True), default=uuid.uuid4)
