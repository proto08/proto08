from contextlib import contextmanager

from sqlalchemy.engine.create import create_engine
from sqlalchemy.engine.url import URL
from sqlalchemy.orm import sessionmaker

from settings import (
    MYSQL_DATABASE,
    MYSQL_HOST_NAME,
    MYSQL_PASSWORD,
    MYSQL_PORT,
    MYSQL_USER,
)

url = URL(
    drivername="mysql+mysqldb",
    username=MYSQL_USER,
    password=MYSQL_PASSWORD,
    host=MYSQL_HOST_NAME,
    port=MYSQL_PORT,
    database=MYSQL_DATABASE,
    query={"charset": "utf8"},
)

engine = create_engine(url, pool_recycle=10)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@contextmanager
def create_session():
    session = SessionLocal()
    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()
