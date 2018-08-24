import React, { Component } from 'react';

const BASE_URL = 'https://minesweeper-api.herokuapp.com/'

class Minesweeper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: {
                board: []
            },
            message:'',
            difficulty: 0
        }
    }

    createGame() {

        fetch(`${BASE_URL}games`,  {
            method: "POST",
            body: JSON.stringify({ difficulty: this.state.difficulty }),
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

    componentDidMount() {
        this.createGame()
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
                        }, () => {
                            this.props.updateMessage(this.state.game.state)

                        })
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

    resetEvent = () => {
        //
        this.createGame()
    }

    handleDifficultyChange = (event) => {
        this.setState({
            difficulty: event.target.value
        }, () => {
            this.createGame()
        })
    }

    render() {
        return (
            <div>
                  <section>
                      <select name="difficulty" onChange={(event) => this.handleDifficultyChange(event)}>
                          <option value="0">Easy</option>
                          <option value="1">Normal</option>
                          <option value="2">Hard</option>
                      </select>
                    <button onClick={this.resetEvent}><span>Reset Game</span></button>
                  </section>
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
