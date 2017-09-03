// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

import Board from './board';

class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
	this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
	this._gameIsOver = false;
	this._userWon = false;
  }
  
  get gameIsOver() {
	return this._gameIsOver;
  }
  
  playMove(rowIndex, columnIndex) {
	/*
	console.log(' ');
	console.log('Flip a tile !');
	console.log(' ');
	let rowIndex =    Window.prompt("   Enter the row index of the tile you wan to flip : ");
	let columnIndex = Window.prompt("Enter the column index of the tile you wan to flip : ");
	console.log(' ');
	*/
	this._board.flipTile(rowIndex, columnIndex);
	if(this._board.playerBoard[rowIndex, columnIndex] === 'B') {
	  console.log('Game is over!');
	  this._board.print();
	  this._gameIsOver = true;
	} else if(!this._board.hasSafeTiles()){
	  console.log("You won the game !");
	  this._gameIsOver = true;
	  this._userWon = true;
	} else {
	  console.log('Current Board:');
	  this._board.print();
	}
  }
}

export default Game;