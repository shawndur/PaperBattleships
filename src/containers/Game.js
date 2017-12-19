import React, {Component} from 'react';
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
    render() {
        return ( 
            <div className='Game'>
                <MessageBox />
                <Enemy gameConfig={gameConfig} />
                <Player gameConfig={gameConfig} />
            </div>
        );
    }
}

export default Game;