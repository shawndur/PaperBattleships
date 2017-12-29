import React from 'react';
import PropTypes from 'prop-types';
import '../css/Ship.css';

/**
 * Stateless functional component that renders a ship
 * @param {*} props 
 */
const Ship = (props) => {
    const {id, horizontal, /*sunk,*/ row, col} = props.ship;
    const {img, size} = props.gameConfig.shipInfo[id];
    
    //wrapper for onClick that calls the onclick function and passes the id of the ship
    // undefined if no onclick function
    const clickHandler = props.onClick ? () => props.onClick(id,true) : undefined;
    
    const styles = {
        gridArea: `${row} / ${col} / ` + (horizontal ? `span 1 / span ${size}` :
            `span ${size} / span 1`)
    };

    if (props.noClick) { styles.pointerEvents = 'none'; }
    
    return (
        <div className='Ship' onClick={clickHandler} style={styles}>
            <img className={horizontal ? 'horizontal' : 'vertical'} 
                src={img} alt='a paper ship' />
        </div>
    );
};

Ship.propTypes = {
    noClick: PropTypes.bool,

    ship: PropTypes.shape({
        id: PropTypes.string.isRequired,
        horizontal: PropTypes.bool.isRequired,
        sunk: PropTypes.bool,
        row: PropTypes.number.isRequired,
        col: PropTypes.number.isRequired
    }).isRequired,

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
    }).isRequired
};

export default Ship;