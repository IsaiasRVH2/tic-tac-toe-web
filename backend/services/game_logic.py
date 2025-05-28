import random
from typing import List, Optional

WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  # filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  # columnas
    [0, 4, 8], [2, 4, 6],            # diagonales
]

HUMAN = "X"
AI = "O"

def evaluate_board(board: List[Optional[str]]) -> Optional[str]:
    for combo in WINNING_COMBINATIONS:
        a, b, c = combo
        if board[a] == board[b] == board[c] and board[a] is not None:
            return board[a]
    if all(cell is not None for cell in board):
        return "draw"
    return None

def find_winning_move(board: List[Optional[str]], player: str) -> Optional[int]:
    for combo in WINNING_COMBINATIONS:
        values = [board[i] for i in combo]
        if values.count(player) == 2 and values.count(None) == 1:
            return combo[values.index(None)]
    return None

def get_available_moves(board: List[Optional[str]]) -> List[int]:
    return [i for i, val in enumerate(board) if val is None]

def minimax(board: List[Optional[str]], is_maximizing: bool) -> int:
    winner = evaluate_board(board)
    if winner == AI:
        return 10
    elif winner == HUMAN:
        return -10
    elif winner == "draw":
        return 0

    scores = []
    for move in get_available_moves(board):
        board[move] = AI if is_maximizing else HUMAN
        score = minimax(board, not is_maximizing)
        scores.append(score)
        board[move] = None

    return max(scores) if is_maximizing else min(scores)

def best_move_minimax(board: List[Optional[str]]) -> int:
    best_score = float('-inf')
    move = -1
    for i in get_available_moves(board):
        board[i] = AI
        score = minimax(board, False)
        board[i] = None
        if score > best_score:
            best_score = score
            move = i
    return move

def choose_move(board: List[Optional[str]], difficulty: str) -> int:
    available = get_available_moves(board)
    if not available:
        return None

    if difficulty == "facil":
        return random.choice(available)

    if difficulty == "normal":
        win = find_winning_move(board, AI)
        if win is not None:
            return win
        block = find_winning_move(board, HUMAN)
        if block is not None:
            return block
        return random.choice(available)

    if difficulty == "dificil":
        return best_move_minimax(board)

    # default
    return random.choice(available)

def process_move(board, difficulty):
    if evaluate_board(board) == "X":
        return None, "X"

    move = choose_move(board, difficulty)
    if move is not None:
        board[move] = "O"
    return move, evaluate_board(board)