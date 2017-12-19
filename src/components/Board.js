import React from 'react';
import PropTypes from 'prop-types'
import '../css/Board.css'

const Board = (props) => {
    const {rows, cols} = props.gameConfig.boardSize;
    const squares = [];
    for (let i=1; i<=rows; ++i) {
        for (let j=1; j<=cols; ++j) {
            squares.push(
                <div 
                    className='square' key={i+','+j} 
                    style={{ gridArea: `${i} / %{j} / span 1 / span 1` }}
                />
            );
        }
    }

    return (
        <div className='Board-container'>
            <div 
                className='Board' 
                style={{gridTemplate: `repeat(${rows},1fr) / repeat(${cols},1fr)`}}
            >
                {squares}
                {props.children}
            </div>
        </div>
    )
}

Board.propTypes = {
    gameConfig: PropTypes.shape({
        boardSize: PropTypes.shape({
            rows: PropTypes.number.isRequired,
            cols: PropTypes.number.isRequired
        }).isRequired
    }).isRequired,
    children: PropTypes.node
}

export default Board;