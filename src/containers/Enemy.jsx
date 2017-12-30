import React, {Component} from 'react';
import Board from '../components/Board';
import ShipTray from '../components/ShipTray';
import {isCollision, isHit} from '../helpers/ships';
import Shots from '../components/Shots';
import Ships from '../components/Ships';

/**
 * Enemy container component
 */
class Enemy extends Component {
    constructor(props) {
        super(props);
        
        this.handleBoardClick = this.handleBoardClick.bind(this);

        this.state = {
            shots: [],
            ships: [],
            shipsRemaining: 0
        };
    }

    /**
     * Callback function that handles a click on the board
     * @callback Enemy~handleBoardClick
     * @param {number} row - row that was clicked
     * @param {number} col - column that was clicked
     */
    handleBoardClick(row, col) {
        //create a shot object
        const shot = {
            row: row,
            col: col,
            hit: false
        };

        //use functional setstate since we need prevstate to calculate nextstate
        this.setState((prevState, props) => {
            const {shots, ships} = prevState;
            let {shipsRemaining} = prevState;
            const {shipInfo} = props.gameConfig;

            //return no changes if not player turn
            if (!props.playerTurn) { return {}; }

            //if shot already exists then return no changes 
            if (shots.some((shot)=> shot.row === row && shot.col === col)){
                return {};
            }

            //find a hit ship if it exists
            const hitShip = ships.find((ship)=> isHit(ship, shot, shipInfo));
            
            if(hitShip) {
                shot.hit = true;
                if (--hitShip.health === 0) {
                    hitShip.sunk = true;
                    if (--shipsRemaining === 0) {
                        props.onEvent.allSunk(false);
                    }
                }
            }

            shots.push(shot);
            props.onEvent.turnEnd(true);

            return {
                shots: shots,
                ships: ships,
                shipsRemaining: shipsRemaining
            };
        });
    }
    
    /**
     * Randomly generate enemy ships
     */
    placeShips() {
        const {shipInfo, boardSize} = this.props.gameConfig;
        const ships = [];

        //for every available ship
        for (let shipId in shipInfo) {
            //create a ship
            const ship = {
                id: shipId, 
                sunk: false,
                horizontal: Math.round(Math.random()) === 0, //randomly decide orientation
                health: shipInfo[shipId].size
            };

            //calculate highest possible row and column
            const maxRow = ship.horizontal ? boardSize.rows : 
                boardSize.rows - shipInfo[shipId].size + 1;
            const maxCol = ship.horizontal ? boardSize.cols - shipInfo[shipId].size + 1 :
                boardSize.cols;

            //until there is no collision generate a random row and column for the ship
            // that is less than the maximum row and column
            do {
                ship.row = Math.floor(Math.random() * maxRow + 1);
                ship.col = Math.floor(Math.random() * maxCol + 1);
            } while (ships.some((otherShip)=>isCollision(ship, otherShip, shipInfo)));

            ships.push(ship);
        }

        this.setState({
            ships: ships,
            shipsRemaining: ships.length
        });

        //notify game that all ships are placed
        this.props.onEvent.ready(false);
    }

    /**
     * Called when component is mounted
     */
    componentWillMount() {
        this.placeShips();
    }

    render() {
        return ( 
            <div className='Enemy'>
                <Board gameConfig={this.props.gameConfig} onClick={this.handleBoardClick} >
                    <Shots shots={this.state.shots} />
                    <Ships gameConfig={this.props.gameConfig} noClick={true} 
                        ships={this.state.ships} />
                </Board>
                <ShipTray gameConfig={this.props.gameConfig} />
            </div>
        );
    }
}

export default Enemy;