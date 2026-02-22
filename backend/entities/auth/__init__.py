from pydantic import Field
from entities import BaseDto


class JWTTokenDto(BaseDto):
    token: str = Field(description="JWT Token")