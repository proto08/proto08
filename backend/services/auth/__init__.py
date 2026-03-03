from sqlalchemy.orm import Session
from entities.auth.email import EmailLoginDto
from services.users import find_user_by_email


def login_with_email(
    dto: EmailLoginDto,
    session: Session
):
    user = find_user_by_email(dto.email, session)

    pass