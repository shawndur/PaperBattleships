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
        this.setState((prevState, props)=> {
            const {ships, selectedShip} = prevState;
            const gameConfig = props.gameConfig;

            if (selectedShip) {
                const ship = Object.assign({row: row, col: col}, selectedShip);
                const valid = !(
                    isOutOfBounds(ship, gameConfig) ||
                    ships.some((otherShip)=>
                        ship.id === otherShip.id ||
                        isCollision(ship, otherShip, gameConfig.shipInfo)
                    )
                );
                if (valid) {
                    ships.push(ship);
                    if (ships.length === Object.keys(gameConfig.shipInfo).length) {
                        this.props.onReady(true);
                    }
                }
            }
            
            return { ships: ships }
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