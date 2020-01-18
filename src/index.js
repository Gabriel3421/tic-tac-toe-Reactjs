import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props){
  return(
    <button className = "square" onClick = {props.onClick} >
      {props.value}
    </button>
    );
}
  
  class Board extends React.Component {
    renderSquare(i) {
      return( <Square 
        key = {i}
        value = {this.props.squares[i]}
        onClick = {() => this.props.onClick(i)}
      />);
    }
    renderRow(i){
      let a = i;
      let b = 0;
      let row = new Array(3);
      for(i; i<a+3; i++){
        row[b] = this.renderSquare(i);
        b++;
      }
      return(row);
    } 
  
    render() {  
      return (
        <div>
          <div className="board-row">
            {this.renderRow(0)}
            
          </div>
          <div className="board-row">
            {this.renderRow(3)}
            
          </div>
          <div className="board-row">
            {this.renderRow(6)}
           
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props){
      super(props);
        let squares = new Array(9);
        let pos = Math.floor(Math.random()*9);
        squares[pos] = 'X'
      this.state = {
        history: [
          {
          squares: squares,
          }
        ],
        stepNumber: 0,
        xIsNext:false,
      };
    }
   
    handleClick(i){
      let player = this.state.xIsNext ? 'X' : 'O';
      var history = this.state.history.slice(0, this.state.stepNumber + 1);
        var current = history[history.length - 1];
        var squares = current.squares.slice();//valor atual do tabuleiro
        if(calculateWinner(squares) || squares[i]){
          return;
        }

      if (player === 'O'){
        
        squares[i] = 'O'; // o quadrado na pos i recebe x ou o
        
      }
      let x = new Array(9);
      for(let i=0; i<9; i++) {
        x[i] = i; 
      }

      x.sort(function(a,b){ return (Math.round(Math.random())-0.5); });
       
      for(let i = 0; i < 9; i++){
        if (squares[x[i]] == null){
          squares[x[i]] = 'X';
          break;
        }
      }
        this.setState({
          history: history.concat([{
            squares: squares,  
          }]),
          stepNumber: history.length,
          xIsNext: this.state.xIsNext,
        },
        () => console.log(this.state));
          
    }
      
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: false,
      });
    }
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      
      const moves = history.map((step,move) => {
        const desc = move ?
        'Go to move #' + move :
        'Go to game start';
        return(
          <li style={{fontSize: 20}} key = {move}>
            <button style={{fontSize: 20}} onClick = {() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
      
      let status;
      if (winner){
        status = 'Winner: '+ winner;
      } else{
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      return (
        <div className="game"> 
          <div className="game-info">
            <div className= "winner-status">{status}</div>
            <ol>{moves}</ol>
          </div>
          <div className="game-board">
            <Board 
              squares = {current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>    
        </div>
      );
    }
  }
  
  // ========================================
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }