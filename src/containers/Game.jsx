import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Enemy from  './Enemy';
import Player from './Player';
import MessageBox from '../components/MessageBox';
import Img from '../res/ship.svg';

/**
 * @todo unhardcode this
 */
const gameConfig = {
    multiPlayer: false,
    boardSize: {
        rows: 10,
        cols: 10
    },
    shipInfo: { 
        ac: {
            name: 'Carrier',
            size: 5, 
            img: Img
        },
        bs: {
            name: 'Battleship',
            size: 4, 
            img: Img
        },
        cs: {
            name: 'Cruiser',
            size: 3, 
            img: Img
        },
        sb: {
            name: 'Submarine',
            size: 3, 
            img: Img
        },
        ds: {
            name: 'Destroyer',
            size: 2, 
            img: Img
        }
    }
}

/**
 * Container component representing a game
 */
class Game extends Component {
    constructor(props) {
        super(props);

        this.handleReady = this.handleReady.bind(this);
        
        this.state = {
            playerTurn: true,
            placement: true,
            playerReady: false,
            enemyReady: false,
            playerShots: [],
            enemyShots: []
        }
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
            this.setState({playerReady: true});
        }

        //use functional setstate since nextstate relies on prevstate
        // set placement to false if both players are ready
        this.setState((prevState, props)=> {
            const {enemyReady, playerReady} = prevState;
            return playerReady && enemyReady ? {placement: false} : {};
        });
    }

    /**
     * Handles a player or enemy ending their turn
     * @callback Game~handleTurnEnd
     * @param {bool} player - true if player false if enemy
     */
    handleTurnEnd(player) {
        this.props.setState((prevState, props)=> {
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

    handleShot(player, shot) {
        const {playerTurn} = this.state;

        if (player && playerTurn) {
            const {playerShots} = this.state;
            playerShots.push(shot);
            this.setState({playerShots});
        } else if (!playerTurn) {
            const {enemyShots} = this.state;
            enemyShots.push(shot);
            this.setState(enemyShots);
        }
    }
    
    render() {
        return ( 
            <div className='Game'>
                <MessageBox />
                <Enemy onReady={this.handleReady} gameConfig={gameConfig} />
                <Player onReady={this.handleReady} gameConfig={gameConfig} />
            </div>
        );
    }
}

Game.propTypes = {
    onGameEnd: PropTypes.func.isRequired
}

export default Game;