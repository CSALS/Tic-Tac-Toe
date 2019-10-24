import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
    <button className = "square" onClick = {props.onClick}>
        {props.value}
    </button>
    );
}
function probability(n) {
    return !!n && Math.random() <= n;
};
//1 -> X , -1 -> O , 0 -> empty cell
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            currentPlayerIsX : true
        };
        if(probability(.5)) {
            this.state.currentPlayerIsX = false;
        }
    }
    calculateWinner() {
        let squares = this.state.squares.slice();
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
    boardIsFull() {
        for(let index = 0;index < 9;index++) {
            if(this.state.squares[index] === null) {
                return false;
            }
        }
        return true;
    }
    handleClick(i) {
        const squares = this.state.squares.slice(); //creates copy of squares
        let nextPlayerIsX = this.state.currentPlayerIsX;
        if(squares[i] === null) {
            //Empty cell
            squares[i] = this.state.currentPlayerIsX ? 'X' : 'O';
            nextPlayerIsX = !this.state.currentPlayerIsX;
        }
        this.setState({
            squares: squares,
            currentPlayerIsX: nextPlayerIsX
        })
    }
    renderSquare(i) {
        return (
            <Square 
                value = {this.state.squares[i]}
                onClick = {() => this.handleClick(i)}
            />
        );
    }
    render() {
        let finalStatus;
        let boardStatus = this.boardIsFull();
        let gameStatus = this.calculateWinner();
        if(boardStatus === true) {
            //Board is full . Either it is tie or X or O
            if(gameStatus === null) {
                //TIE
                finalStatus = 'Game is tie.';
            }
            else {
                finalStatus = `Winner is player ${gameStatus}`;
            }
        }
        else {
            //Board is not full. Either there is winner or game not completed yet
            if(gameStatus === null) {
                finalStatus = `Current player: ${(this.state.currentPlayerIsX ? 'X':'O')}`;
            }
            else {
                finalStatus = `Winner is player ${gameStatus}`;
            }
        }
        return (
            <div>
                <div className="status">
                    {finalStatus}    
                </div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}
  
class Game extends React.Component {
    render() {
        return (
        <div className="game">
            <div className="game-board">
            <Board />
            </div>
            <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
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
