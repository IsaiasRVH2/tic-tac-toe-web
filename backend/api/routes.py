from fastapi import APIRouter
from backend.models.schemas import PlayRequest, PlayResponse
from backend.services.game_logic import process_move

router = APIRouter()

@router.post("/play", response_model=PlayResponse)
def play_move(req: PlayRequest):
    board = req.board.copy()
    difficulty = req.difficulty

    move, winner = process_move(board, difficulty)
    return PlayResponse(move=move, winner=winner)