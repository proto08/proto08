from fastapi import APIRouter
from . import auth as auth_router
from . import users as users_router

AUTH_TAG = "auth"
USERS_TAG = "users"

router = APIRouter()

router.include_router(
    auth_router.router,
    prefix="/auth",
    tags=[AUTH_TAG]
)

router.include_router(
    users_router.router,
    prefix="/users",
    tags=[USERS_TAG]
)