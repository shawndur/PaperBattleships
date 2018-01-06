import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Ships from './Ships';
import '../css/ShipTray.css';

/**
 * ShipTray Component
 */
class ShipTray extends PureComponent {

    constructor(props) {
        super(props);

        const shipInfo = props.gameConfig.shipInfo;
        const ships = [];
        let rows = 1;
        let cols =  0; 

        //create a ship element for each ship in shipinfo
        for (let shipId in shipInfo) {
            const size = shipInfo[shipId].size;

            ++rows;
            if (size > cols) { cols = size; }

            ships.push(
                {id: shipId, row: rows, sunk: false, col: 1, horizontal: true}
            );
        }

        this.state = {
            ships: ships,
            rows: rows,
            cols: cols+1,
            horizontal: true
        };

        this.handleClick = this.handleClick.bind(this);
        this.rotate = this.rotate.bind(this);
    }

    /**
     * Rotate ships in the ship tray
     */
    rotate() {
        this.setState((prevState)=> {
            const newShips = prevState.ships.map((ship)=> {
                return {
                    id: ship.id,
                    row: ship.col,
                    col: ship.row,
                    sunk: ship.sunk,
                    horizontal: !ship.horizontal
                };
            });

            return { ships: newShips };
        });
    }

    /**
     * Callback function to handle a ship being clicked 
     * @callback ShipTray~handleClick
     * @param {string} id - id of the ship being clicked
     */
    handleClick(id) {
        const ship = this.state.ships.find((ship)=> id === ship.id);
        return this.props.onShipSelect(id, ship.horizontal);
    }

    render() {
        const {rows, cols} = this.state;
        const shipClick = this.props.onShipSelect ? this.handleClick : undefined;
        const noRotate = this.props.noRotate;
            
        return(
            <div className='ShipTray-container'>
                <div className='ShipTray' 
                    style={{gridTemplate: `repeat(${rows},1fr) / repeat(${cols},1fr)`}} >
                    <Ships ships={this.state.ships} onClick={shipClick}
                        gameConfig={this.props.gameConfig} />
                    {!noRotate && <i className='fa fa-repeat' onClick={this.rotate} />}
                </div>
            </div>
        );
    }
}

ShipTray.propTypes = {
    gameConfig: PropTypes.shape({
        shipInfo: function(props, propName, componentName, location, propFullName) {
            const prop = props[propName];

            //check that prop is an object and exists
            if (prop === 'null' || typeof prop !== 'object') {
                return new Error(
                    `Invalid prop ${propFullName} supplied to ${componentName}.`
                    + ' Expected an object'
                );
            }

            //check shape of each item in prop
            for (let shipId in prop) {
                //expected shape of each item in prop 
                let shape = {
                    size: 'number',
                    name: 'string',
                    img: 'string'
                };

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
    }).isRequired,
    onShipSelect: PropTypes.func,
    noRotate: PropTypes.bool
};

export default ShipTray;