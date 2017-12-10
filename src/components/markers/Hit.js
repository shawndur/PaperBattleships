import React from 'react';
import PropTypes from 'prop-types';
import Circle from './Circle';

const Hit = (props) => {
    const styles = {
        gridArea: `${props.row} / ${props.col} / span 1 / span 1`
    }

    return( 
        <div style={styles}>
            <Circle color='red' />
        </div>
    )
}

Hit.propTypes = {
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired
}

export default Hit;