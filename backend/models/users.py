from sqlalchemy import VARCHAR, Column, Integer

from models import BaseModel, UUIDModel


class User(BaseModel, UUIDModel):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(VARCHAR(255), nullable=False)
    email = Column(VARCHAR(255), nullable=False)
