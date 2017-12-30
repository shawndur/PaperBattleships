import React from 'react';
import PropTypes from 'prop-types';
import '../css/MainMenu.css';

/**
 * Stateless functional component that renders a main menu screen
 * @param {*} props 
 */
const MainMenu = (props) => {
    return( 
        <div className='MainMenu'>
            <header>
                <h1>Paper Battleships</h1>
            </header>
            <nav>
                <button onClick={()=> props.onGameStart(false)}>
                    SinglePlayer
                </button>
                <button onClick={()=> props.onGameStart(true)} disabled="disabled">
                    MultiPlayer
                </button>
            </nav>
        </div>
    );
};

MainMenu.propTypes = {
    onGameStart: PropTypes.func.isRequired,
};

export default MainMenu;