import React from 'react';
import PropTypes from 'prop-types';
import Img from '../res/ship.svg';
import '../css/Ship.css'

const Ship = (props) => {
    const styles = {
    };

    switch (props.dir) {
        case 'N':
            styles.gridArea = `span ${props.size} / ${props.col} / ${props.row+1} / span 1`;
            break;
        case 'S':
            styles.gridArea = `${props.row} / ${props.col} / span ${props.size} / span 1`;
            break;
        case 'W':
            styles.gridArea = `${props.row} / span ${props.size} / span 1 / ${props.col+1}`;
            break;
        case 'E':
        default:
            styles.gridArea = `${props.row} / ${props.col} / span 1 / span ${props.size}`;
    }
    
    return (
        <div className='Ship' style={styles}>
            <img className={props.dir} src={Img} alt='a paper ship' />
        </div>
    )
}

Ship.propTypes = {
    size: PropTypes.number.isRequired,
    dir: PropTypes.oneOf(['N','S','E','W']),
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired
}

export default Ship;