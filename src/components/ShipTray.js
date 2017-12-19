import React from 'react';
import PropTypes from 'prop-types';
import Ship from './Ship';
import '../css/ShipTray.css';

const ShipTray = (props) => {
    return(
        <div className='ShipTray-container'>
            <div className='ShipTray'>
                <Ship ship={{id:'ac', row: 1, col: 1}} gameConfig={props.gameConfig} />
                <Ship ship={{id:'bs', row: 2, col: 1}} gameConfig={props.gameConfig} />
                <Ship ship={{id:'cs', row: 3, col: 1}} gameConfig={props.gameConfig} />
                <Ship ship={{id:'sb', row: 3, col: 4}} gameConfig={props.gameConfig} />
                <Ship ship={{id:'ds', row: 2, col: 5}} gameConfig={props.gameConfig} />
            </div>
        </div>
    );
}

ShipTray.propTypes = {
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

export default ShipTray;