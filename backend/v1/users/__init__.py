from fastapi import APIRouter
from . import details as details_router
from . import me as me_router


router = APIRouter()

router.include_router(
    details_router.router,
    prefix="/prefix"
)

router.include_router(
    me_router.router,
    prefix="/me"
)
