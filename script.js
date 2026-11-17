// --- Zaroori HTML Elements Select Karna ---
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-game-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// --- Game Variables ---
let turnO = true; // Agar true, to player O ki bari hai, warna X ki
let count = 0; // Moves count karne ke liye (Draw check karne ke liye)

// --- Winning Patterns ---
// Yeh array Tic-Tac-Toe mein jeetne ke saare possible combinations batata hai
const winPatterns = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal (top-left to bottom-right)
    [2, 4, 6], // Diagonal (top-right to bottom-left)
];

// --- Game Reset/Initialize Functions ---

// Game ko shuru se shuru karne ke liye
const resetGame = () => {
    turnO = true; // O se shuru karein
    count = 0; // Moves count reset karein
    enableBoxes(); // Saare boxes ko dobara click karne ke qabil banayein
    msgContainer.classList.add("hide"); // Winner message ko chhupayein
}

// Saare boxes ko click karne ke qabil banana
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false; // Button ko enable karein
        box.innerText = ""; // Text (X/O) clear karein
    }
}

// Saare boxes ko click karne se rokna (jab winner ho)
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true; // Button ko disable karein
    }
}

// Winner ko dikhana
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`; // Winner ka naam dikhayein
    msgContainer.classList.remove("hide"); // Message container ko dikhayein
    disableBoxes(); // Game khatam, ab koi box click na ho
}

// --- Box Click Handler ---
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) { // Agar O ki bari hai
            box.innerText = "O";
            turnO = false; // Agli bari X ki
        } else { // Agar X ki bari hai
            box.innerText = "X";
            turnO = true; // Agli bari O ki
        }
        box.disabled = true; // Click karne ke baad box ko disable karein
        count++; // Move count barhayein

        let isWinner = checkWinner(); // Har move ke baad winner check karein

        if (count === 9 && !isWinner) { // Agar saare boxes bhar gaye aur koi winner nahi
            gameDraw();
        }
    });
});

// --- Game Draw Function ---
const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

// --- Winner Check Function ---
const checkWinner = () => {
    for (let pattern of winPatterns) {
        // Har pattern ke 3 boxes ki values ko dekhein
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        // Agar teeno boxes mein koi value hai (empty nahi)
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            // Aur teeno values same hain, to winner hai
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val); // Winner dikhao
                return true; // Winner mil gaya
            }
        }
    }
    return false; // Koi winner nahi mila
}

// --- Event Listeners for Buttons ---
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);