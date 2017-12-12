import React from 'react';
import PropTypes from 'prop-types'
import '../../css/Board.css'

const Board = (props) => {
    const squares = [];
    for (let i=1; i<=props.rows; ++i) {
        for (let j=1; j<=props.columns; ++j) {
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
                style={{gridTemplate: `repeat(${props.rows},1fr) / repeat(${props.columns},1fr)`}}
            >
                {squares}
                {props.children}
            </div>
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