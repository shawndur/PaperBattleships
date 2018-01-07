import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Enemy from  './Enemy';
import Player from './Player';
import MessageBox from '../components/MessageBox';

/**
 * Container component representing a game
 */
class Game extends Component {
    constructor(props) {
        super(props);
    
        this.handlers = { 
            ready: this.handleReady.bind(this),
            turnEnd: this.handleTurnEnd.bind(this),
            allSunk: this.handleAllSunk.bind(this)
        };

        this.state = {
            playerTurn: false,
            playerReady: false,
            enemyReady: false,
            placement: true
        };
    }

    /**
     * Handles a player or enemy being ready
     * @callback Game~handleReady
     * @param {bool} player - true if player false if enemy
     */
    handleReady(player) {
        if (player) {
            //if player is ready set player ready state to true
            this.setState({playerReady: true});
        } else {
            //if enemy is ready set enemy ready state to true
            this.setState({enemyReady: true});
        }

        //use functional setstate since nextstate relies on prevstate
        // set placement to false if both players are ready
        this.setState((prevState)=> {
            const {enemyReady, playerReady} = prevState;
            if (playerReady && enemyReady) {
                return {
                    placement: false, 
                    playerTurn: true
                };
            } else {
                return {};
            }
        });
    }

    /**
     * Handles a player or enemy ending their turn
     * @callback Game~handleTurnEnd
     * @param {bool} player - true if player false if enemy
     */
    handleTurnEnd(player) {
        this.setState((prevState)=> {
            const playerTurn = prevState.playerTurn;
            //invert playerTurn if player has the turn, else don't change state
            return playerTurn === player ? {playerTurn: !playerTurn} : {};
        });
    }

    /**
     * Handles a player or enemy having all their ships sunk
     * @callback Game~handleAllSunk
     * @param {bool} player - true if player false if enemy
     */
    handleAllSunk(player) {
        //call onGameEnd passing string of winner
        this.props.onGameEnd(player ? 'Enemy' : 'Player');
    }
    
    render() {
        return ( 
            <div className='Game'>
                <MessageBox />
                <Enemy 
                    placement={this.state.placement}
                    playerTurn={this.state.playerTurn}
                    onEvent={this.handlers}
                    gameConfig={this.props.gameConfig} 
                />
                <Player 
                    placement={this.state.placement}
                    playerTurn={this.state.playerTurn}
                    onEvent={this.handlers}
                    gameConfig={this.props.gameConfig} 
                />
            </div>
        );
    }
}

Game.propTypes = {
    onGameEnd: PropTypes.func.isRequired,
    gameConfig: PropTypes.object.isRequired
};

export default Game;