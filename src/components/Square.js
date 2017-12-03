import React from "react";
import PropTypes from 'prop-types';
import '../css/Square.css'

const Square = (props) => {
    const row = props.row;
    const column = props.column;
    const styles = {
        gridArea: row + " / " + column + " / span 1 / span 1"
    }
    return (
        <div className="Square" style={styles}>
        </div>
    )
}

Square.propTypes = {
    row: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
      
    column: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
}

export default Square;