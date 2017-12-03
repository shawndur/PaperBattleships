import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import '../css/Grid.css'

const Grid = (props) => {
    const rows = props.rows;
    const columns = props.columns;
    const styles = {
        gridTemplate: "repeat("+rows+",1fr) / repeat("+columns+",1fr)"
    };
    const squares = [];
    for (let i=1; i<=rows; ++i) {
        for (let j=1; j<=columns; ++j) {
            squares.push(<Square key={"grid-square:"+i+","+j} row={i} column={j}/>);
        }
    }
    return (
        <div className="Grid-container">
            <div className="Grid" style={styles}>
                {squares}
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