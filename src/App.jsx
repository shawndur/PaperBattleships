import React, { Component } from 'react';
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

    /**
     * Callback function to start the game
     * @callback App~handleGameStart
     * @param {bool} multiPlayer - true if started in multiplayer mode
     */
    handleGameStart(multiPlayer){
        GameConfig.multiPlayer = multiPlayer;
        this.setState({
            gameState: 'started',
        });
    }

    /**
     * Callback function to end the game
     * @callback App~handleGameEnd
     * @param {string} winner - Name of the winner
     */
    handleGameEnd(winner) {
        this.setState({
            gameState: 'over',
            winner: winner
        });
    }

    /**
     * Callback function to create a new game
     * @callback App~handleNewGame
     */
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
                {game}
            </div>
        );
    }
}

export default App;
