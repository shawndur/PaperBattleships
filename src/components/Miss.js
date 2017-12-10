import React from 'react';
import Circle from './Circle';

const Miss = (props) => {
    const styles = {
        gridArea: `${props.row} / ${props.col} / span 1 / span 1`
    }

    return( 
        <div style={styles}>
            <Circle color='White' />
        </div>
    )
}

export default Miss;