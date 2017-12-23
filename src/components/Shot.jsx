import React from 'react';
import PropTypes from 'prop-types';
import '../css/Shot.css'

const Shot = (props) => {
    const styles = {
        gridArea: `${props.shot.row} / ${props.shot.col} / span 1 / span 1`
    }
    const color = props.shot.hit ? 'red' : 'white';
    return (
        <div className='Shot' style={styles}>
            <svg height='100' width='100'>
                <circle cx='50%' cy='50%' r='25%' stroke='black' strokeWidth='5%' fill={color}/>
            </svg>
        </div>
    );
}

Shot.propTypes = {
    shot: PropTypes.shape({
        row: PropTypes.number.isRequired,
        col: PropTypes.number.isRequired,
        hit: PropTypes.bool.isRequired
    }).isRequired
}

export default Shot