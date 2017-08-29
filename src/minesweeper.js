const generatePlayerBoard = function(numberOfRows, numberOfColumns) {
  let board = [];
  for(let rowIndex=0; rowIndex < numberOfRows; rowIndex++) {
	board.push([]);
    for(let columnIndex=0; columnIndex < numberOfColumns; columnIndex++) {
      board[rowIndex].push(' ');
    }
  }
  return board;
}

const generateBombBoard = function(numberOfRows, numberOfColumns, numberOfBombs) {
  let board = [];
  for(let rowIndex=0; rowIndex < numberOfRows; rowIndex++) {
	board.push([]);
    for(let columnIndex=0; columnIndex < numberOfColumns; columnIndex++) {
      board[rowIndex].push(null);
    }
  }
  let numberOfBombsPlaced = 0;
  while(numberOfBombsPlaced < numberOfBombs) {
	
	let randomRowIndex = Math.floor(Math.random() * numberOfRows);
	let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
	
	if(board[randomRowIndex][randomColumnIndex] === null) {
	  board[randomRowIndex][randomColumnIndex] = 'B';
	  numberOfBombsPlaced++;
	}
  }
  return board;
}

const printBoard = board => console.log(board.map(row => row.map(cell => cell === null ? ' ' : cell).join(' | ')).join('\n'));

let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board:');
printBoard(playerBoard);
console.log('Bomb Board:');
printBoard(bombBoard);
