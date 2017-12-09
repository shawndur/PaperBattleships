import React from "react";
import PropTypes from 'prop-types';
import '../../css/Square.css'

const Square = (props) => {
    const styles = {
        gridArea: `${props.row} / ${props.col} / span 1 span 1`
    }
    return (
        <div className="Square" style={styles}>
        </div>
    )
}

Square.propTypes = {
    row: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired,

    col: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired
}

export default Square;