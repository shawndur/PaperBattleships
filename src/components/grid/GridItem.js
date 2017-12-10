import React from "react";
import PropTypes from "prop-types";

const GridItem = (props) => {
    const startRow = props.pos.row[0];
    const startCol = props.pos.col[0];
    const endRow = (props.pos.spanRow ? "span " : "") + props.pos.row[1];
    const endCol = (props.pos.spanCol ? "span " : "") + props.pos.col[1];
    const styles = {
        gridArea: `${startRow} / ${startCol} / ${endRow} / ${endCol}`
    }
    return (
        <div style={styles}>
            {props.children}
        </div>
    );
}

const tuplePropType = (props, propName, componentName) => {
    const prop = props[propName];
    if(!Array.isArray(prop) || prop.length !== 2 || !prop.every(Number.isInteger)) {
        return new Error(`${propName} must be an array of 2 integers`);
    }
}

GridItem.propTypes = {
    pos: PropTypes.shape({
        row: tuplePropType.isRequired,
        col: tuplePropType.isRequired,
        spanRow: PropTypes.bool.isRequired, 
        spanCol: PropTypes.bool.isRequired
    }).isRequired,

    children: PropTypes.node.isRequired
}

export default GridItem