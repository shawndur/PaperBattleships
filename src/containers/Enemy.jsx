import React, {Component} from 'react';
import Board from '../components/Board';
import ShipTray from '../components/ShipTray';
import {isCollision} from '../helpers/ships';

import Ship from '../components/Ship';

class Enemy extends Component {
    constructor(props) {
        super(props);
        
        this.handleBoardClick = this.handleBoardClick.bind(this);
    }

    handleBoardClick(row, col) {

    }
    
    componentWillMount() {
        const {shipInfo, boardSize} = this.props.gameConfig;
        const ships = [];

        for (let shipId in shipInfo) {
            const ship = {
                id: shipId, 
                sunk: false,
                horizontal: Math.round(Math.random()) === 0
            }

            const maxRow = ship.horizontal ? boardSize.rows : 
                boardSize.rows - shipInfo[shipId].size + 1;
            const maxCol = ship.horizontal ? boardSize.cols - shipInfo[shipId].size + 1 :
                boardSize.cols;

            do {
                ship.row = Math.floor(Math.random() * maxRow + 1);
                ship.col = Math.floor(Math.random() * maxCol + 1);
            } while (ships.some((otherShip)=>isCollision(ship, otherShip, shipInfo)));

            ships.push(ship);
        }

        this.setState({
            ships: ships
        });
    }

    render() {
        const ships = this.state.ships.map((ship) => 
            <Ship key={ship.id} ship={ship} gameConfig={this.props.gameConfig} />
        );
        return ( 
            <div className='Enemy'>
                <Board gameConfig={this.props.gameConfig} onClick={this.handleBoardClick} />
                <ShipTray gameConfig={this.props.gameConfig} />
            </div>
        );
    }
}

export default Enemy;