import React from "react";
import "./Game.css";
import Cell from "./Cell";

const HEIGHT = 360;
const WIDTH = 600;
const CELL_SIZE = 15;



class Game extends React.Component {
  constructor() {
    super();

    this.board = this.makeEmptyBoard();

    this.state = {
      cells: [],
      isRunning: false,
      interval: 25
    };
  }

  rows = HEIGHT / CELL_SIZE;
  cols = WIDTH / CELL_SIZE;

  makeEmptyBoard = () => {
    let board = [];
    for (let y = 0; y < this.rows; y++) {
      board[y] = [];
      for (let x = 0; x < this.cols; x++) {
        board[y][x] = false;
      }
    }
    console.log(board)
    return board;
  };

  makeCells = () => {
    let cells = [];
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.board[y][x]) {
          cells.push({ x, y });
        }
      }
    }

    return cells;
  };

  clear = () => {
    this.board = this.makeEmptyBoard();
    this.setState({ cells: this.makeCells() });
  };

  random = () => {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.board[y][x] = Math.random() >= 0.5;
      }
    }
    // console.log(this.board)
    
    this.setState({ cells: this.makeCells() });
    console.log(this.state.cells)
  };

  handleIntervalChange = event => {
    this.setState({ interval: event.target.value });
  };

  run = () => {
    this.setState({ isRunning: true });
    this.runIteration();
  };

  stopGame = () => {
    this.setState({ isRunning: false });
    if (this.timeoutHandler) {
      window.clearTimeout(this.timeoutHandler);
      this.timeoutHandler = null;
    }
  };

  runIteration = () => {
    let newBoard = this.makeEmptyBoard();

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let neighbors = this.calculateNeighbors(this.board, x, y);
        if (this.board[y][x]) {
          if (neighbors === 2 || neighbors === 3) {
            newBoard[y][x] = true;
          } else {
            newBoard[y][x] = false;
          }
        } else {
          if (!this.board[y][x] && neighbors === 3) {
            newBoard[y][x] = true;
          }
        }
      }
    }

    this.board = newBoard;
    this.setState({ cells: this.makeCells() });

    this.timeoutHandler = window.setTimeout(() => {
      this.runIteration();
    }, this.state.interval);
  };

  calculateNeighbors = (board, x, y) => {
    let neighbors = 0;
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1]
    ];
    for (let i = 0; i < directions.length; i++) {
      const direction = directions[i];
      let y1 = y + direction[0];
      let x1 = x + direction[1];

      if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && board[y1][x1]) {
        neighbors++;
      }
    }

    return neighbors;
  };

  render() {
    const { cells, interval, isRunning } = this.state;
    return (
      <div>
        <h3>Conway's Game of Life</h3>
        <div
          className="Board"
          style={{
            width: WIDTH,
            height: HEIGHT,
            backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`
          }}
        >
          {cells.map(cell => (
            <Cell x={cell.x} y={cell.y} key={`${cell.x}, ${cell.y}`} />
          ))}
        </div>

        <div className="controls">
          Speed{" "}
          <select
            value={this.state.interval}
            onChange={this.handleIntervalChange}
          >
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="75">75</option>
            <option value="100">100</option>
          </select>
          ms
          
          {isRunning ? (
            <button className="btn" onClick={this.stopGame}>
              Stop
            </button>
          ) : (
            <button className="btn" onClick={this.run}>
              Run
            </button>
          )}
          <button className="btn" onClick={this.random}>
            Random
          </button>
          <button className="btn" onClick={this.clear}>
            Clear
          </button>
        </div>
      </div>
    );
  }
}

export default Game;
