import React from 'react';
import PropTypes from 'prop-types';

/**
 * Stateless functional component that reders a gameover screen
 * @param {*} props 
 */
const GameOver = (props) => {
    return (
        <div>
            <header>
                <h1>Game Over</h1>
                <h3>{props.winner} Won!!</h3>
            </header>
            <nav>
                <button onClick={props.onNewGame}>
                    NewGame
                </button>
            </nav>
        </div>
    );
}

GameOver.propTypes = {
    winner: PropTypes.string.isRequired,
    onNewGame: PropTypes.func.isRequired
}

export default GameOver;