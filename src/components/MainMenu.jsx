import React from 'react';
import '../css/MainMenu.css';

const MainMenu = (props) => {
    return( 
        <div className='MainMenu'>
            <header>
                <h1>Paper Battleships</h1>
            </header>
            <nav>
                <button>SinglePlayer</button>
                <button disabled="disabled">MultiPlayer</button>
            </nav>
        </div>
    );
}

export default MainMenu;