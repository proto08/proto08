from pydantic import BaseModel, ConfigDict


class BaseResponse(BaseModel):
    message: str = "OK"

class BaseDto(BaseModel):
    """Base class of DTO"""

    model_config = ConfigDict(
        str_strip_whitespace=True
    )