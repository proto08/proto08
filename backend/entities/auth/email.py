from pydantic import EmailStr, Field
from entities import BaseDto


class EmailLoginDto(BaseDto):
    mail: EmailStr = Field(description="mail address")
    password: str = Field(description="password")