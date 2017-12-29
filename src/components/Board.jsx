import React from 'react';
import PropTypes from 'prop-types';
import Squares from './Squares';
import '../css/Board.css';

/**
 * Stateless functional component that renders a game board
 * @param {*} props 
 */
const Board = (props) => {
    const {rows, cols} = props.gameConfig.boardSize;

    //wrapper for onClick, splits the key of a clicked square 
    // and calls on click passing the row and col
    const handleClick = props.onClick ? (e) => {
        const coord = e.target.id.split(',');
        props.onClick(parseInt(coord[0], 10), parseInt(coord[1], 10));
    } : undefined;
    
    return (
        <div className='Board-container'>
            <div 
                className='Board' 
                style={{gridTemplate: `repeat(${rows},1fr) / repeat(${cols},1fr)`}}
                onClick={handleClick}
            >
                <Squares rows={rows} cols={cols}/>
                {props.children}
            </div>
        </div>
    );
};

Board.propTypes = {
    gameConfig: PropTypes.shape({
        boardSize: PropTypes.shape({
            rows: PropTypes.number.isRequired,
            cols: PropTypes.number.isRequired
        }).isRequired
    }).isRequired,
    children: PropTypes.node,
    onClick: PropTypes.func
};

export default Board;