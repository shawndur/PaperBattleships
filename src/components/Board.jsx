import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Squares from './Squares';
import '../css/Board.css';

/**
 * Board component that renders a game board
 */
class Board extends PureComponent {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        if (this.props.onClick) {
            const coord = e.target.id.split(',');
            this.props.onClick(parseInt(coord[0], 10), parseInt(coord[1], 10));
        }
    }

    render() {
        const {rows, cols} = this.props.gameConfig.boardSize;
        const handleClick = this.props.onClick ? this.handleClick : undefined;
        
        return (
            <div className='Board-container'>
                <div 
                    className='Board' 
                    style={{gridTemplate: `repeat(${rows},1fr) / repeat(${cols},1fr)`}}
                    onClick={handleClick}
                >
                    <Squares rows={rows} cols={cols}/>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

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