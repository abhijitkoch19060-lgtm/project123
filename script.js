const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "X";
let gameActive = true;
let gameState = Array(9).fill(null);

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute("data-index");

  if (!gameActive || gameState[index]) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  if (checkWinner()) {
    statusText.textContent = `Winner: ${currentPlayer}`;
    gameActive = false;
    return;
  }

  if (gameState.every(cell => cell)) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Turn: ${currentPlayer}`;
}

function checkWinner() {
  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

function resetGame() {
  gameState.fill(null);
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  });
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Turn: ${currentPlayer}`;
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", resetGame);
