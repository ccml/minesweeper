const printBoard = board => {
  console.log('Current Board:');
  console.log(board[0].join('|'));
  console.log(board[1].join('|'));
  console.log(board[2].join('|'));
};

let board = [];

board.push([],[],[]);

board[0].push(' ', ' ', ' ');
board[1].push(' ', ' ', ' ');
board[2].push(' ', ' ', ' ');

printBoard(board);

board[0][1] = '1';
board[2][2] = 'B';

printBoard(board);
