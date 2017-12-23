import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Enemy from  './Enemy';
import Player from './Player';
import MessageBox from '../components/MessageBox';
import Img from '../res/ship.svg';

const gameConfig = {
    mode: 'single',
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

class Game extends Component {
    constructor(props) {
        super(props);

        this.handleReady = this.handleReady.bind(this);
        
        this.state = {
            phase: 'placement',
            playerReady: false,
            enemyReady: false
        }
    }

    handleReady(player) {
        let {phase, playerReady, enemyReady} = this.state;

        if (player) {
            playerReady = true;
        } else {
            enemyReady = true;    
        }

        if (playerReady && enemyReady) { phase = 'combat'; }

        this.setState({
            phase: phase,
            enemyReady: enemyReady,
            playerReady: playerReady
        });
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