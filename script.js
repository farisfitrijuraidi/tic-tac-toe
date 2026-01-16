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
    const placeMarker = (row, column, token) => {
        board[row][column] = token;
    };
    return {
        getBoard,
        placeMarker
    };
})();

const GameController = ((playerOneName = "Faris", playerTwoName = "Fitri") => {
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
        switchPlayerTurn();
        console.log(Gameboard.getBoard());
    };
    return {
        playRound,
        getActivePlayer
    };
})();