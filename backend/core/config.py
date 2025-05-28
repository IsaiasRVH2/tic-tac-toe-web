import os
from dotenv import load_dotenv

load_dotenv()
class Settings:
     APP_ENV = os.getenv("APP_ENV", "development")
     DEBUG = os.getenv("DEBUG", "true").lower() == "true"
     ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://127.0.0.1:60226").split(",")

settings = Settings()