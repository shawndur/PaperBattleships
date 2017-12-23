import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Board from '../components/Board';
import ShipTray from '../components/ShipTray';
import {isCollision} from '../helpers/ships';
import Ship from '../components/Ship';

class Player extends Component {
    constructor(props) {
        super(props);
        
        this.handleBoardClick = this.handleBoardClick.bind(this);
        this.handleShipSelect = this.handleShipSelect.bind(this);

        this.state = {
            ships: []
        }
    }

    handleBoardClick(row, col) {
        const {ships, selectedShip} = this.state;
        const shipInfo = this.props.gameConfig.shipInfo;

        selectedShip.row = row;
        selectedShip.col = col;

        if (!selectedShip) { return; }
        
        if (ships.some((ship) => ship.id === selectedShip.id || 
            isCollision(selectedShip, ship, shipInfo))) { return; }

        ships.push(selectedShip);

        this.setState({
            ships: ships
        });
    }

    handleShipSelect(shipId, horizontal) {
        this.setState({
            selectedShip: {
                shipId: shipId,
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

Player.propTypes = {
    gameConfig: PropTypes.shape({
        shipInfo: function(props, propName, componentName, location, propFullName) {
            const prop = props[propName];

            //check that prop is an object and exists
            if (prop === 'null' || typeof prop !== 'object') {
                return new Error(
                    `Invalid prop ${propFullName} supplied to ${componentName}.`
                    + ` Expected an object`
                );
            }

            //check shape of each item in prop
            for (let shipId in prop) {
                //expected shape of each item in prop 
                let shape = {
                    size: 'number',
                    name: 'string',
                    img: 'string'
                }

                for (let key in shape){
                    //check that item in prop has expected property
                    if (typeof prop[shipId][key] !== shape[key]) {
                        return new Error(
                            `Invalid prop ${propFullName}.${shipId}.${key} supplied to ${componentName}.`
                            + ` Expected an ${shape[key]}`
                        );
                    }
                }
            }
        }
    }).isRequired
}

export default Player;