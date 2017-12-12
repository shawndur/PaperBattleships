import React from 'react';
import PropTypes from 'prop-types'
import Grid from '../grid/Grid';
import '../../css/Board.css'

const Board = (props) => {
    const squares = [];
    for (let i=1; i<=props.rows; ++i) {
        for (let j=1; j<=props.columns; ++j) {
            squares.push(
                <div className='square' key={`%{i},%{j}`} 
                     style={{ gridArea: `${i} / %{j} / span 1 / span 1` }}/>
            );
        }
    }

    return (
        <div className='Board'>
            <Grid rows={props.rows} columns={props.columns}>
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