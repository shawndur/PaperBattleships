import React from 'react';
import PropTypes from 'prop-types';
import Ship from './Ship';
import '../css/ShipTray.css';

/**
 * @todo allow rotating of ships
 */

/**
 * Stateless functional component that renders a shiptray view 
 * @param {*} props 
 */
const ShipTray = (props) => {
    const shipInfo = props.gameConfig.shipInfo;
    const ships = [];
    let rows = 0;
    let cols =  0; 

    //create a ship element for each ship in shipinfo
    for (let shipId in shipInfo) {
        const size = shipInfo[shipId].size;

        ++rows;
        if (size > cols) { cols = size; }

        ships.push(
            <Ship key={shipId} onClick={props.onShipSelect} gameConfig={props.gameConfig}
                ship={{id: shipId, row: rows, col: 1, horizontal: true}} />
        );
    }

    return(
        <div className='ShipTray-container'>
            <div className='ShipTray' style={{gridTemplate: `repeat(${rows},1fr) / repeat(${cols},1fr)`}}>
                {ships}
            </div>
        </div>
    );
};

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
    onShipSelect: PropTypes.func
};

export default ShipTray;