from sqlalchemy.orm import Session
from entities.auth.email import EmailLoginDto


def login_with_email(
    dto: EmailLoginDto,
    session: Session
):
    # user = find_user_by_email()
    pass