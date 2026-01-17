from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from models import DeletableModel, UUIDModel


class User(DeletableModel, UUIDModel):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    avatar_url: Mapped[str] = mapped_column(String(255), nullable=True)
