const Gameboard = (() => {
    const rows = 3;
    const columns = 3;
    let board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(0);
        }
    }
    const getBoard = () => board;
    const haveZero = () => board.some(row => row.includes(0));
    const checkWinner = () => {
        if (((board[0][0] === "X" && board[0][1] === "X" && board[0][2] === "X") || (board[0][0] === "O" && board[0][1] === "O" && board[0][2] === "O")) ||
            ((board[1][0] === "X" && board[1][1] === "X" && board[1][2] === "X") || (board[1][0] === "O" && board[1][1] === "O" && board[1][2] === "O")) ||
            ((board[2][0] === "X" && board[2][1] === "X" && board[2][2] === "X") || (board[2][0] === "O" && board[2][1] === "O" && board[2][2] === "O")) ||
            ((board[0][0] === "X" && board[1][0] === "X" && board[2][0] === "X") || (board[0][0] === "O" && board[1][0] === "O" && board[2][0] === "O")) ||
            ((board[0][1] === "X" && board[1][1] === "X" && board[2][1] === "X") || (board[0][1] === "O" && board[1][1] === "O" && board[2][1] === "O")) ||
            ((board[0][2] === "X" && board[1][2] === "X" && board[2][2] === "X") || (board[0][2] === "O" && board[1][2] === "O" && board[2][2] === "O")) ||
            ((board[0][0] === "X" && board[1][1] === "X" && board[2][2] === "X") || (board[0][0] === "O" && board[1][1] === "O" && board[2][2] === "O")) ||
            ((board[0][2] === "X" && board[1][1] === "X" && board[2][0] === "X") || (board[0][2] === "O" && board[1][1] === "O" && board[2][0] === "O")))  {
            return true;
        } else {
            return false;
        }
    };
    const placeMarker = (row, column, token) => {
        if (board[row][column] === 'X' || board[row][column] === 'O') {
            return false;
        } else {
            board[row][column] = token;
        }
    }
    const clearBoard = () => {
        board.forEach(row => row.fill(0));
    };
    return {
        getBoard,
        haveZero,
        placeMarker,
        checkWinner,
        clearBoard
    };
})();

const DisplayController = (() => {
    const container = document.querySelector('#gameboard');
    const p = document.querySelector('.winner');
    const p2 = document.querySelector('.turn');
    const restartButton = document.querySelector('.restart-btn');

    const renderBoard = () => {
        container.innerHTML = '';
        Gameboard.getBoard().forEach((row, rowIndex) => {
            row.forEach((item, colIndex) => {
                const div = document.createElement('div');
                div.classList.add('div-board');
                div.dataset.rowIndex = rowIndex;
                div.dataset.colIndex = colIndex;
                div.textContent = item === 0 ? '' : item ;
                container.appendChild(div);
                div.addEventListener('click', clickSchema);
            })
        })
    };
    const clickSchema = (e) => {
        const targetRow = e.target.dataset.rowIndex;
        const targetColumn = e.target.dataset.colIndex;
        GameController.playRound(targetRow, targetColumn);
        renderBoard();
    };
    const announceWinner = (message) => {
        p.textContent = message;
    };
    const announceTurn = (message) => {
        p2.textContent = message;
    };
    const restartGame = () => {
        restartButton.addEventListener('click', () => {
            Gameboard.clearBoard();
            GameController.resetGame();
            renderBoard();
        })
    }
    return {
        renderBoard,
        clickSchema,
        announceWinner,
        announceTurn,
        restartGame
    };
})();

const GameController = ((playerOneName = "Player One", playerTwoName = "Player Two") => {
    let isGameOver = false;
    const players = [
        {
            name: playerOneName,
            token: "X"
        },
        {
            name: playerTwoName,
            token: "O"
        }
    ];
    let activePlayer = players[0];
    const getActivePlayer = () => activePlayer;
    DisplayController.announceTurn(`${getActivePlayer().name}'s turn`);
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        DisplayController.announceTurn(`${getActivePlayer().name}'s turn`);
    }
    const playRound = (row, column) => {
        if (isGameOver) return;
        if (Gameboard.placeMarker(row, column, getActivePlayer().token) === false) {
            return;
        }
        if (Gameboard.checkWinner()) {
            DisplayController.announceWinner(`${getActivePlayer().name} WINS!`);
            isGameOver = !isGameOver;
            return;
        } else if (Gameboard.checkWinner() === false && Gameboard.haveZero() === false) {
            DisplayController.announceWinner("DRAW!");
            return;
        }
        switchPlayerTurn();
    };
    const resetGame = () => {
        isGameOver = false;
        activePlayer = players[0];
        DisplayController.announceWinner('');
        DisplayController.announceTurn(`${getActivePlayer().name}'s turn`);
    };
    return {
        playRound,
        getActivePlayer,
        resetGame
    };
})();

DisplayController.renderBoard();
DisplayController.restartGame();