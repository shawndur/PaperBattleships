import React from 'react';
import PropTypes from 'prop-types'
import Grid from '../grid/Grid';
import Square from './Square';
import '../../css/Board.css'

const Board = (props) => {
    const rows = props.rows;
    const columns = props.columns;
    const squares = [];
    for (let i=1; i<=rows; ++i) {
        for (let j=1; j<=columns; ++j) {
            squares.push(
                <Square key={"grid-square:"+i+","+j} row={i} col={j}/>
            );
        }
    }

    return (
        <div className='Board'>
            <Grid rows={rows} columns={columns}>
                {squares}
                {props.children}
            </Grid>
        </div>
    )
}

Board.propTypes = {
    rows: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
      
    columns: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,

    children: PropTypes.node
}

export default Board;