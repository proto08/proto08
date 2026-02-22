from pydantic import EmailStr, Field
from entities import BaseDto


class EmailLoginDto(BaseDto):
    email: EmailStr = Field(description="email address")
    password: str = Field(description="password")