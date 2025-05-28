export function getDifficultyFromURL() {
    return new URLSearchParams(window.location.search).get("difficulty");
}

export function updateTurnIndicator(turn) {
    const text = turn === "X" ? "Tu turno": "Turno de la IA";
    document.getElementById("turn-indicator").textContent = text;
}

export function updateBoardView(boardButtons, boardState) {
    boardButtons.forEach((btn, index) => {
        btn.textContent = boardState[index] ?? "";
        btn.disabled = boardState[index] !== null;
    });
}

export function getBoardState(boardButtons) {
    return Array.from(boardButtons).map(btn => btn.textContent || null);
}

export function disableBoard(boardButtons) {
    boardButtons.forEach(btn => btn.disabled = true);
}

export function enableEmptyCells(boardButtons) {
    boardButtons.forEach(btn => {
        if (btn.textContent === "") btn.disabled = false;
    });
}

export function resetBoard(boardButtons) {
    boardButtons.forEach(btn => {
        btn.textContent = "";
        btn.disabled = false;
    });
    updateTurnIndicator("X");
}

const allowedDifficulties = ["fácil", "normal", "difícil"];

function updateViewFromURL() {
    const params = new URLSearchParams(window.location.search);
    const difficulty = params.get("difficulty");

    if (allowedDifficulties.includes(difficulty)) {
        buttonGroup.classList.add("d-none");
        boardContainer.classList.remove("d-none");
    } else {
        buttonGroup.classList.remove("d-none");
        boardContainer.classList.add("d-none");

        // Limpiar URL si dificultad no es válida
        const url = new URL(window.location);
        url.searchParams.delete("difficulty");
        history.replaceState({}, "", url);
    }
}

