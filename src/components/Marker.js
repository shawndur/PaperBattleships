import React from 'react';
import PropTypes from 'prop-types';
import '../css/Marker.css'

const Marker = (props) => {
    const styles = {
        gridArea: `${props.row} / ${props.col} / span 1 / span 1`
    }
    const color = props.type === 'Hit' ? 'red' : 'white';
    return (
        <div className='Marker' style={styles}>
            <svg height='100' width='100'>
                <circle cx='50%' cy='50%' r='25%' stroke='black' strokeWidth='5%' fill={color}/>
            </svg>
        </div>
    );
}

Marker.propTypes = {
    type: PropTypes.oneOf(['Hit','Miss']).isRequired,
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired
}

export default Marker