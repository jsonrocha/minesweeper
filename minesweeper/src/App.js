import React, { Component } from 'react';
import './App.css';
import Minesweeper from './Minesweeper';

class App extends Component {
    
  constructor(props) {
    super(props)
    this.state = {
       message:'Minesweeper'
    }
  }
  
  displayGameResult = (state) => {
    if (state === "lost") {
        //display lost message
        this.setState({
        message: "You lost!"
        })
    } else if (state === "win") {
        this.setState({
            message:"Oh yeah! You won!"
        })
    } else {
        this.setState({
            message: "still sweepin..."
        })
    }
  }

  render() {
    return (
      <div className="App">
<h1>{this.state.message}</h1>
        <Minesweeper updateMessage={this.displayGameResult}/>
      </div>
    );
  }
}

export default App;