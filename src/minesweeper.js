class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
	this._numberOfRows = numberOfRows;
	this._numberOfColumns = numberOfColumns;
	this._numberOfBombs = numberOfBombs;
	this._numberOfTiles = this._numberOfRows * this._numberOfColumns;
	this._playerBoard = this.generatePlayerBoard(this._numberOfRows, this._numberOfColumns);
	this._bombBoard = this.generateBombBoard(this._numberOfRows, this._numberOfColumns, this._numberOfBombs);
  }
  
  get playerBoard() {
	return _playerBoard;
  }
  
  generatePlayerBoard(numberOfRows, numberOfColumns) {
    let board = [];
    for(let rowIndex=0; rowIndex < numberOfRows; rowIndex++) {
	  board.push([]);
      for(let columnIndex=0; columnIndex < numberOfColumns; columnIndex++) {
        board[rowIndex].push(' ');
      }
    }
    return board;
  }
  
  generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
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
  
  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets  = [];
    for(let i=-1; i <= 1; i++) {
      for(let j=-1; j <= 1; j++) {
		if((i !== 0) || (j !== 0)) {
	      neighborOffsets.push([i, j]);
		}
      }
    }
    let numberOfRows = this._bombBoard.length;
    let numberOfColumns = this._bombBoard[0].length;
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
			if(this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
				numberOfBombs++;
			}
		}
	  }
    );
    return numberOfBombs;
  }
  
  flipTile(rowIndex, columnIndex) {
	if(this._playerBoard[rowIndex][columnIndex] !== ' ') {
		return;
	} else if(this._bombBoard[rowIndex][columnIndex] === 'B') {
		this._playerBoard[rowIndex][columnIndex] = 'B';
		return;
	} else {
		this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
	}
  }
  
  hasSafeTiles() {
	return this._numberOfTiles === this._numberOfBombs;
  }
  
  print() {
	console.log(this._playerBoard.map(row => row.map(cell => cell === null ? ' ' : cell).join(' | ')).join('\n'));
  }

}

let board = new Board(3, 4, 5);
console.log('Player Board:');
board.print();

//console.log('Bomb Board:');
//printBoard(bombBoard);

board.flipTile(0, 0);
console.log('Updated Player Board:');
board.print();
