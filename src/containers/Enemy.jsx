import React, {Component} from 'react';
//import PropTypes from 'prop-types';
import Board from '../components/Board';
import ShipTray from '../components/ShipTray';

class Enemy extends Component {
    handleBoardClick(row, col) {

    } 

    render() {
        return ( 
            <div className='Player'>
                <Board gameConfig={this.props.gameConfig} onClick={this.handleBoardClick} />
                <ShipTray gameConfig={this.props.gameConfig} />
            </div>
        );
    }
}

Enemy.propTypes = {
}

export default Enemy;