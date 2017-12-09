import React from 'react';
import PropTypes from 'prop-types';
import '../../css/Grid.css'

const Grid = (props) => {
    const styles = {
        gridTemplate: `repeat(${props.rows},1fr) / repeat(${props.columns},1fr)`
    };
    
    return (
        <div className="Grid" style={styles}>
            {props.children}
        </div>
    )
}

Grid.propTypes = {
    rows: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
      
    columns: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,

    children: PropTypes.node.isRequired
}

export default Grid;