import React, {Component} from 'react';
import Board from '../components/Board';
import ShipTray from '../components/ShipTray';

class Player extends Component {
    render() {
        return ( 
            <div className='Player'>
                <ShipTray gameConfig={this.props.gameConfig} />
                <Board gameConfig={this.props.gameConfig} />
            </div>
        );
    }
}

export default Player;