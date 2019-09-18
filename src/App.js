import React from 'react';
import './App.css';
import { Button } from 'antd/lib';
import { FaTimes } from "react-icons/fa";
import {
  FaRegCircle

} from "react-icons/fa";


class Square extends React.Component {
  render() {
    const value = this.props.value;
    var icon = null;
    if (value) {
      icon = value === "X" ? <FaTimes className="cross" /> : <FaRegCircle className="nought" />;
    }
    return (
      <Button className="square" type="default" onClick={() => this.props.onClick()}>
        {icon}
      </Button>
    );
  };
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(400).fill(null),
      xNext: true,
      winner: null,
    };
  }

  createBoard() {
    let board = []
    for (let i = 0; i < 20; i++) {
      let row = []
      for (let j = 0; j < 20; j++) {
        row.push(<Square value={this.state.squares[20 * i + j]} onClick={() => this.handleClick(20 * i + j)} />)
      }
      board.push(<div className="board-row">{row}</div>);
    }
    return board;
  }

  handleClick(i) {
    const squares = this.state.squares.slice(); // create a copy of this.state.squares
    if (squares[i] !== null || this.state.winner !== null)
      return;
    squares[i] = this.state.xNext ? 'X' : 'O';
    this.setState({ squares: squares, xNext: !this.state.xNext }); // pass the replicant squares array into the original squares array

    let row = Math.floor(i / 20);
    let col = i % 20;
    let count = 0;

    // check row
    for (let k = 0; k < 20; k++) {
      if (squares[row * 20 + k] !== squares[i]) {
        count = 0;
      }
      else count++;

      if (count === 5) {
        this.setState({ winner: squares[i] });
        console.log("Winner " + squares[i]);
      }
    }

    // check col
    for (let k = 0; k < 20; k++) {
      if (squares[k * 20 + col] !== squares[i]) {
        count = 0;
      }
      else count++;
      if (count === 5) {
        this.setState({ winner: squares[i] });
        console.log("Winner " + squares[i]);
      }
    }
    // check diagonal
    let inital_pos = i % 21;
    for (let k = 0; k < 20; k++) {
      if (squares[inital_pos + 21 * k] !== squares[i]) {
        count = 0;
      }
      else count++;
      if (count === 5) {
        this.setState({ winner: squares[i] });
        console.log("Winner " + squares[i]);
      }
    }
    // check anti-diagonal
    let inital_pos_anti = i % 21 + 2 * row;
    console.log(i);
    console.log(inital_pos_anti);
    for (let k = 0; k < 20; k++) {
      if (squares[inital_pos_anti + 19 * k] !== squares[i]) {
        count = 0;
      }
      else count++;
      if (count === 5) {
        this.setState({ winner: squares[i] });
        console.log("Winner " + squares[i]);
      }
    }
  }
  handleClickReset() {
    const original = Array(400).fill(null);
    this.setState({ squares: original, winner: null, xNext: true });
  }
  render() {
    let status;
    if (this.state.winner) {
      status = 'Winner: ' + this.state.winner;
    } else {
      status = 'Next player: ' + (this.state.xNext ? 'X' : 'O');
    }
    return (
      <div className="container">
        <div className="status">{status}</div>
        <div className="game">
          <div className="game-board">
            {this.createBoard()}
          </div>
        </div>
        <div className="button-reset"><Button type="primary" background-color="#0da192" onClick={() => this.handleClickReset()}>RESET THE GAME</Button></div>
      </div>

    )
  }
}

export default Board;
