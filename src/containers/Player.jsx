import React, {Component} from 'react';
import Board from '../components/Board';
import ShipTray from '../components/ShipTray';

class Player extends Component {
    handleBoardClick(row, col) {

    }

    render() {
        return ( 
            <div className='Player'>
                <ShipTray gameConfig={this.props.gameConfig} />
                <Board gameConfig={this.props.gameConfig} onClick={this.handleBoardClick} />
            </div>
        );
    }
}

export default Player;