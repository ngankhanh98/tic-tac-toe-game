import React from 'react';
import './App.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  createBoard() {
    let board = []
    for (let i = 0; i < 20; i++) {
      let row = []
      for (let j = 0; j < 20; j++) {
        /*row.push(<Square value={this.state.squares[20 * i + j]} onClick={() => this.handleClick(20 * i + j)} />)*/
        row.push(this.renderSquare(20*i+j))
      }
      board.push(<div className="board-row">{row}</div>);
    }
    return board;
  }
  render() {
    return (
      this.createBoard()
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(400).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      winner: null
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1); 
    const board = this.state.history[this.state.stepNumber];
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if(this.state.winner || squares[i])
    { 
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    
    this.setState({ winner: calculateWinner(i, board, squares[i])});
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }
  handleClickReset(){
    this.setState({ history:[{squares:Array(400).fill(null)}], winner: null, xNext: true, stepNumber:0 });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.state.winner;

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
          <button onClick={()=> this.handleClickReset()}>RESET THE GAME</button>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(i, squares, value) {
  let row = Math.floor(i / 20);
    let col = i % 20;
    let count = 0;
    let winner = null;
    
    console.log(squares.squares[1]);
    console.log(row, col);

    // check row
    for (let k = 0; k < 20; k++) {
      if (squares.squares[row * 20 + k] !== value) {
        count = 0;
        
      }
      else count++;
      if (count === 4) {
        return value;
      }
      
    }

    // check col
    for (let k = 0; k < 20; k++) {
      if (squares.squares[k * 20 + col] !== value) {
        count = 0;
      }
      else count++;
      if (count === 4) {
        return value;
      }
    }
    // check diagonal
    let inital_pos = i % 21;
    for (let k = 0; k < 20; k++) {
      if (squares.squares[inital_pos + 21 * k] !== value) {
        count = 0;
      }
      else count++;
      if (count === 4) {
        return value;
      }
    }
    // check anti-diagonal
    let inital_pos_anti = i % 21 + 2 * row;
   // console.log(i);
    //console.log(inital_pos_anti);
    for (let k = 0; k < 20; k++) {
      if (squares.squares[inital_pos_anti + 19 * k] !== value) {
        count = 0;
      }
      else count++;
      if (count === 4) {
        return value;
      }
    }

   
    return winner;
}

export default Game;