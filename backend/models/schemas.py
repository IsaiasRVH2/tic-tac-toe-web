from pydantic import BaseModel
from typing import List, Optional

class PlayRequest(BaseModel):
    board: List[Optional[str]]
    difficulty: str

class PlayResponse(BaseModel):
    move: Optional[int]
    winner: Optional[str]
