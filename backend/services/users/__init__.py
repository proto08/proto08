from sqlalchemy.orm import Session

from models.users import User


def find_user_by_email(email: str, session: Session) -> User:
    user = session.query(User).filter_by(email=email, deleted_at=None).first()
    return user
