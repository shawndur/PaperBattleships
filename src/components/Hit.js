import React from 'react';
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

export default Hit;