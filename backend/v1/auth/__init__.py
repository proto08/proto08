from fastapi import APIRouter
from . import email as email_router


router = APIRouter()


router.include_router(
    email_router.router,
    prefix="/email"
)
