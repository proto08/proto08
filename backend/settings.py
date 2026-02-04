import os

from dotenv import load_dotenv

load_dotenv()


DEBUG = os.getenv("DEBUG", False)
TIME_ZONE = os.getenv("TZ", "Asia/Tokyo")

MYSQL_ROOT_PASSWORD = os.getenv("MYSQL_ROOT_PASSWORD", "")
MYSQL_DATABASE = os.getenv("MYSQL_DATABASE", "")
MYSQL_USER = os.getenv("MYSQL_USER", "")
MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD", "")
MYSQL_PORT = int(os.getenv("MYSQL_PORT", "3306"))
MYSQL_HOST_NAME = os.getenv("MYSQL_HOST_NAME", "")
