import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';

import Game from './containers/Game';
import MainMenu from './components/MainMenu';
import GameOver from './components/GameOver';
import GameConfig from './config/GameConfig';

/**
 * Top application component
 */
class App extends Component {
    constructor(props) {
        super(props);

        this.handleGameStart = this.handleGameStart.bind(this);
        this.handleGameEnd = this.handleGameEnd.bind(this);
        this.handleNewGame = this.handleNewGame.bind(this);

        this.state = {
            gameState: 'new'
        };
    }

    handleGameStart(multiPlayer){
        GameConfig.multiPlayer = multiPlayer;
        this.setState({
            gameState: 'started',
        });
    }

    handleGameEnd(winner) {
        this.setState({
            gameState: 'over',
            winner: winner
        });
    }

    handleNewGame() {
        this.setState({
            gameState: 'new'
        });
    }
    
    render() {
        let game;
        switch (this.state.gameState) {
        case 'new':
            game = <MainMenu onGameStart={this.handleGameStart} />;
            break;
        
        case 'started':
            game = <Game onGameEnd={this.handleGameEnd} gameConfig={GameConfig} />;
            break;
        
        case 'over':
        default:
            game = <GameOver onNewGame={this.handleNewGame} winner={this.state.winner} />;
            break;
        }

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                {game}
            </div>
        );
    }
}

export default App;
