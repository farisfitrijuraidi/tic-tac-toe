const Gameboard = (function() {
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

// function Cell() {
//     let value = 0;

// }