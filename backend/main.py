import uvicorn
from fastapi import FastAPI

import v1
from entities import BaseResponse

app = FastAPI()
app.include_router(v1.router, prefix="/v1")


@app.get("/", response_model=BaseResponse)
async def root() -> BaseResponse:
    return BaseResponse()


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True)
