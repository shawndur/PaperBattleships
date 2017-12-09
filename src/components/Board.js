import React from 'react';
import PropTypes from 'prop-types'
import Grid from './Grid';
import GridItem from './GridItem';
import Square from './Square';
import '../css/Board.css'

const Board = (props) => {
    const rows = props.rows;
    const columns = props.columns;
    const squares = [];
    for (let i=1; i<=rows; ++i) {
        for (let j=1; j<=columns; ++j) {
            const pos = {
                row: [i,1],
                col: [j,1],
                spanRow: true,
                spanCol: true
            }
            squares.push(
                <GridItem key={"grid-square:"+i+","+j} pos={pos}>
                    <Square />
                </GridItem>
            );
        }
    }

    return (
        <div className='Board'>
            <Grid rows={rows} columns={columns}>
                {squares}
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
    ]).isRequired
}

export default Board;