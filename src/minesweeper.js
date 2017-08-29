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

const getNumberOfNeighborBombs = function(bombBoard, rowIndex, columnIndex) {
  const neighborOffsets  = [];
  for(let i=-1; i <= 1; i++) {
    for(let j=-1; j <= 1; j++) {
		if((i !== 0) || (j !== 0)) {
	      neighborOffsets.push([i, j]);
		}
    }
  }
  let numberOfRows = bombBoard.length;
  let numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;
  neighborOffsets.forEach(
    offset => {
		let neighborRowIndex = rowIndex + offset[0];
		let neighborColumnIndex = columnIndex + offset[1];
		if(
		  (neighborRowIndex >= 0)
		  &&
		  (neighborRowIndex < numberOfRows)
		  &&
		  (neighborColumnIndex >= 0)
		  &&
		  (neighborColumnIndex < numberOfColumns)
		) {
			if(bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
				numberOfBombs++;
			}
		}
	}
  );
  return numberOfBombs;
}

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
	if(playerBoard[rowIndex][columnIndex] !== ' ') {
		return;
	} else if(bombBoard[rowIndex][columnIndex] === 'B') {
		playerBoard[rowIndex][columnIndex] = 'B';
		return;
	} else {
		playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
	}
}

let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board:');
printBoard(playerBoard);
console.log('Bomb Board:');
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board:');
printBoard(playerBoard);