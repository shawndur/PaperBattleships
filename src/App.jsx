import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';

import Game from './containers/Game';
import MainMenu from './components/MainMenu';
import GameOver from './components/GameOver';

class App extends Component {
  handleGameStart(mode) {

  }

  handleGameEnd(winner) {

  }

  handleNewGame() {

  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <MainMenu onGameStart={this.handleGameStart} />
        <Game onGameEnd={this.handleGameEnd} />
        <GameOver onNewGame={this.handleNewGame} winner="Player 1" />
      </div>
    );
  }
}

export default App;
