from typing import Annotated
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import create_session
from entities.auth import JWTTokenDto
from entities.auth.email import EmailLoginDto
from services.auth import login_with_email

router = APIRouter()


@router.post(
    "",
    response_model=JWTTokenDto
)
async def login(
    dto: EmailLoginDto,
    session: Annotated[Session, Depends(create_session)]
):
    access_token = login_with_email()
    pass