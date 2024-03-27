const cells = document.querySelectorAll('.cell');
const statusDisplay = document.querySelector('.status');
const restart = document.querySelector('.restart');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCell(cellEvent) {
    const cell = cellEvent.target;
    const cellIndex = parseInt(cell.getAttribute('data-cell-index'));
    
    if (gameState[cellIndex] !== '' || !gameActive) {
        return;
    }
    
    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWin();
    checkDraw();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (gameState[a] !== '' && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            statusDisplay.textContent = `${currentPlayer} wins!`;
            gameActive = false;
            return;
        }
    }
}

function checkDraw() {
    if (!gameState.includes('')) {
        statusDisplay.textContent = 'It\'s a draw!';
        gameActive = false;
    }
}

function handleRestart() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.textContent = '';
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCell));
restart.addEventListener('click', handleRestart);
