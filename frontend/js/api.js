import { BACKEND_URL } from "./config.js";

export async function playMove(board, difficulty) {
    const response = await fetch(`${BACKEND_URL}/play`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ board, difficulty })
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
}