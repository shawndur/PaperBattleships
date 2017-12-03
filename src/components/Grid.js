import React from 'react';
import PropTypes from 'prop-types';
import '../css/Grid.css'

const Grid = (props) => {
    const rows = props.rows;
    const columns = props.columns;
    const styles = {
        gridTemplate: "repeat("+rows+",1fr) / repeat("+columns+",1fr)"
    };
    return (
        <div className="Grid-container">
            <div className="Grid" style={styles}>
                {props.children}
            </div>
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
    ]).isRequired
}

export default Grid;