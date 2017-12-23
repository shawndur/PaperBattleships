import React, {Component} from 'react';
import Board from '../components/Board';
import ShipTray from '../components/ShipTray';
import {isCollision, isOutOfBounds} from '../helpers/ships';
import Ship from '../components/Ship';

class Player extends Component {
    constructor(props) {
        super(props);
        
        this.handleBoardClick = this.handleBoardClick.bind(this);
        this.handleShipSelect = this.handleShipSelect.bind(this);

        this.state = {
            ships: [],
            selectedShip: undefined
        }
    }

    handleBoardClick(row, col) {
        const {ships} = this.state;
        const selectedShip = Object.assign({}, this.state.selectedShip)
        const {boardSize, shipInfo} = this.props.gameConfig;

        if (!selectedShip) { return; }

        selectedShip.row = row;
        selectedShip.col = col;
       
        if (isOutOfBounds(selectedShip, boardSize, shipInfo)) { return; }

        if (ships.some(
            (ship) =>  
                ship.id === selectedShip.id || 
                isCollision(selectedShip, ship, shipInfo)
            )
        ) { return; }

        ships.push(selectedShip);

        this.setState({
            ships: ships,
            //selectedShip: undefined
        });
    }

    handleShipSelect(shipId, horizontal) {
        this.setState({
            selectedShip: {
                id: shipId,
                sunk: false,
                horizontal: horizontal
            }
        });
    }

    render() {
        const ships = this.state.ships.map((ship) => 
            <Ship key={ship.id} ship={ship} gameConfig={this.props.gameConfig} />
        );

        return ( 
            <div className='Player'>
                <ShipTray gameConfig={this.props.gameConfig} onShipSelect={this.handleShipSelect}/>
                <Board gameConfig={this.props.gameConfig} onClick={this.handleBoardClick}>
                    {ships}
                </Board>
            </div>
        );
    }
}

export default Player;