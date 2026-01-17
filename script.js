const Gameboard = (() => {
    const rows = 3;
    const columns = 3;
    const board = [];

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
        board[row][column] = token;
    };
    return {
        getBoard,
        haveZero,
        placeMarker,
        checkWinner
    };
})();

const GameController = ((playerOneName = "Faris", playerTwoName = "Asyiqin") => {
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
    console.log(`${getActivePlayer().name}'s turn.`);
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        console.log(`${getActivePlayer().name}'s turn.`);
    }
    const playRound = (row, column) => {
        Gameboard.placeMarker(row, column, getActivePlayer().token);
        if (Gameboard.checkWinner()) {
            console.log(`${getActivePlayer().name} WINS!`);
            return;
        } else if (Gameboard.checkWinner() === false && Gameboard.haveZero() === false) {
            console.log("DRAW!");
            return;
        }
        switchPlayerTurn();
        console.log(Gameboard.getBoard());
    };
    return {
        playRound,
        getActivePlayer
    };
})();

const DisplayController = (() => {
    const container = document.querySelector('#gameboard');
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
            })
        })
    }
    const clickSchema = (e) => {
        const targetRow = e.target.dataset.rowIndex;
        const targetColumn = e.target.dataset.colIndex;
        GameController.playRound(targetRow, targetColumn);
        renderBoard();
    }
    container.addEventListener('click', clickSchema);
    return {
        renderBoard,
        clickSchema
    };
})();

DisplayController.renderBoard();