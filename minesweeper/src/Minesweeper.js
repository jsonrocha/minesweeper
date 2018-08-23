import React, { Component } from 'react';

const BASE_URL = 'https://minesweeper-api.herokuapp.com/'

class Minesweeper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: {
                board: []
            },
            message:''
        }
    }

    componentDidMount() {
        // create the board
        // create board 
        fetch(`${BASE_URL}games`,  {
            method: "POST",
            body: JSON.stringify({ difficulty: 0 }),
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(resp => resp.json())
            .then(newGame => {
                console.log("game", newGame);
                this.setState({
                    game: newGame
                })
            })
    }

    displayGameResult () {
        if (this.state.game.state === "lost") {
            //display lost message
            this.setState({
            message: "You lost!"
            })
        } else if (this.state.game.state === "win") {
            this.setState({
                message:"Oh yeah! You won!"
            })
        } else {
            this.setState({
                message: "still sweepin..."
            })
        }
    }

    handleCellClick = (row, col) => {
        if (!(this.state.game.state === "lost" || this.state.game.state === "won")) {
            fetch(`${BASE_URL}games/${this.state.game.id}/check`,  {
                method: "POST",
                body: JSON.stringify({ row:row, col:col }),
                headers: {
                    'Content-Type':'application/json'
                }
            })
            .then(resp => resp.json())
                .then(newGameState => {
                    console.log(newGameState);
                        this.setState({
                            game: newGameState,
                        })
                        this.displayGameResult()
                })
        }

    }

    handleFlaggedCell = (event, row, col) => {
        console.log(event)
        event.preventDefault( )
        console.log('flagged', row,col)
        fetch(`${BASE_URL}games/${this.state.game.id}/flag`,  {
            method: "POST",
            body: JSON.stringify({ row:row, col:col }),
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(resp => resp.json())
            .then(newGameState => {
                console.log("game", newGameState);
                this.setState({
                    game: newGameState
                })
            })

    }

    render() {
        return (
            <div>
                  <h1>{this.state.message}</h1>
               <table>
                   <tbody>
                       {this.state.game.board.map((row, i) => {
                         return <tr key={i}>{
                             row.map((col, j) => {
                                return <td 
                                className="cell" 
                                key={j}
                                onClick={() => this.handleCellClick(i,j)}
                                onContextMenu={(event) => this.handleFlaggedCell(event, i,j)}
                                >{this.state.game.board[i][j]}</td>
                             })
                         }</tr>
                       })}
                   </tbody>
               </table>
            
            </div>
        );
    }
}

export default Minesweeper;
