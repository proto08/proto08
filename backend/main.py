from fastapi.responses import JSONResponse
import uvicorn
from fastapi import FastAPI, Request

from entities.errors import AuthenticationError, ForbiddenError, NotFoundError, ValidationError
import v1
from entities import BaseResponse
from settings import DEBUG

app = FastAPI()
app.include_router(v1.router, prefix="/v1")

@app.exception_handler(NotFoundError)
async def not_found(_: Request, exc: NotFoundError):
    return JSONResponse(status_code=404, content={"message": exc.message})

@app.exception_handler(AuthenticationError)
async def unauthorized(_: Request, exc: AuthenticationError):
    return JSONResponse(status_code=401, content={"message": exc.message})

@app.exception_handler(ForbiddenError)
async def forbidden(_: Request, exc: ForbiddenError):
    return JSONResponse(status_code=401, content={"message": exc.message})

@app.exception_handler(ValidationError)
async def badrequest(_: Request, exc: ValidationError):
    return JSONResponse(status_code=400, content={"message": exc.message})


@app.get("/", response_model=BaseResponse)
async def root() -> BaseResponse:
    return BaseResponse()


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True if DEBUG else None)
