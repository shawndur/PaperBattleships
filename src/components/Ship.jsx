import React from 'react';
import PropTypes from 'prop-types';
//import Img from '../res/ship.svg';
import '../css/Ship.css'

const Ship = (props) => {
    const {id, dir, /*sunk,*/ row, col} = props.ship;
    const {img, size} = props.gameConfig.shipInfo[id];
    const styles = {};

    switch (dir) {
        case 'N':
            styles.gridArea = `span ${size} / ${col} / ${row+1} / span 1`;
            break;
        case 'S':
            styles.gridArea = `${row} / ${col} / span ${size} / span 1`;
            break;
        case 'W':
            styles.gridArea = `${row} / span ${size} / span 1 / ${col+1}`;
            break;
        case 'E':
        default:
            styles.gridArea = `${row} / ${col} / span 1 / span ${size}`;
    }
    
    return (
        <div className='Ship' style={styles}>
            <img className={dir} src={img} alt='a paper ship' />
        </div>
    )
}

Ship.propTypes = {
    ship: PropTypes.shape({
        id: PropTypes.string.isRequired,
        dir: PropTypes.oneOf(['N','S','E','W']),
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

export default Ship;