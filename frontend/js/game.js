import { playMove } from "./api.js";

import {
    getDifficultyFromURL,
    updateTurnIndicator,
    getBoardState,
    resetBoard,
    disableBoard,
    enableEmptyCells,
} from "./dom.js";

document.addEventListener("DOMContentLoaded", () => {
    const boardButtons = document.querySelectorAll(".square");
    const difficultyButtons = document.querySelectorAll(".btn-difficulty");
    const resetButton = document.getElementById("reset-button");
    const homeButton = document.getElementById("home-button");
    const brand = document.getElementById("brand");
    
    function updateView() {
        const difficulty = getDifficultyFromURL();
        document.getElementById("difficulty-button-group").classList.toggle("d-none", !!difficulty);
        document.getElementById("board-container").classList.toggle("d-none", !difficulty);
    }
    
    function clearDifficultyAndUpdate(){
        const url = new URL(window.location);
        url.searchParams.delete("difficulty");
        history.pushState({}, "", url);
        resetBoard(boardButtons);
        updateView();
    }

    difficultyButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const difficulty = btn.getAttribute("value");
            const url = new URL(window.location);
            url.searchParams.set("difficulty", difficulty);
            history.pushState({}, "", url);
            resetBoard(boardButtons);
            updateView();
        });
    });

    boardButtons.forEach(btn => {
        btn.addEventListener("click", async () => {
            console.log("Estado del botón:", btn.disabled ?? btn.textContext !== "");
            if (btn.disabled ?? btn.textContext !== "") return;
                

            btn.textContent = "X";
            btn.disabled = true;
            updateTurnIndicator("O");

            const board = getBoardState(boardButtons);
            const difficulty = getDifficultyFromURL();
            try {
                disableBoard(boardButtons);
                const data = await playMove(board, difficulty);

                if (typeof data.move === "number") {
                    boardButtons[data.move].textContent = "O";
                    boardButtons[data.move].disabled = true;
                    updateTurnIndicator("X");
                }

                if(data.winner){
                    const indicator = document.getElementById("turn-indicator");
                    indicator.textContent = data.winner === "draw" ? "¡Es un empate!" : `¡${data.winner} ha ganado!`;
                } else {
                    enableEmptyCells(boardButtons);
                }
            } catch (err) {
                console.error("Error al jugar el movimiento:", err);
            }
        });
    });

    resetButton.addEventListener("click", () => resetBoard(boardButtons));
    homeButton.addEventListener("click", clearDifficultyAndUpdate);
    brand.addEventListener("click", clearDifficultyAndUpdate);

    updateView();
});