from fastapi import FastAPI
from backend.core.config import settings
from fastapi.middleware.cors import CORSMiddleware
from backend.api.routes import router as game_router

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(game_router)