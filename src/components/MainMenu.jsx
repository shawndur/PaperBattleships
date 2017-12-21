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
                <button onClick={()=>props.onGameStart('single')}>
                    SinglePlayer
                </button>
                <button onClick={()=>props.onGameStart('multi')} disabled="disabled">
                    MultiPlayer
                </button>
            </nav>
        </div>
    );
}

MainMenu.propTypes = {
    onGameStart: PropTypes.func.isRequired
}

export default MainMenu;