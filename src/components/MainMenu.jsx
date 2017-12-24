import React from 'react';
import PropTypes from 'prop-types';
import '../css/MainMenu.css';

const MainMenu = (props) => {
    return( 
        <div className='MainMenu'>
            <header>
                <h1>Paper Battleships</h1>
            </header>
            <nav>
                <button onClick={props.onSinglePlayerStart}>
                    SinglePlayer
                </button>
                <button onClick={props.onMultiPlayerStart} disabled="disabled">
                    MultiPlayer
                </button>
            </nav>
        </div>
    );
}

MainMenu.propTypes = {
    onSinglePlayerStart: PropTypes.func.isRequired,
    onMultiPlayerStart: PropTypes.func.isRequired
}

export default MainMenu;