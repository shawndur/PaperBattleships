import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Board from '../components/Board';
import ShipTray from '../components/ShipTray';
import {isCollision, isHit} from '../helpers/ships';
import Shots from '../components/Shots';
import Ships from '../components/Ships';

/**
 * Enemy container component
 */
class Enemy extends PureComponent {
    constructor(props) {
        super(props);
        
        this.handleBoardClick = this.handleBoardClick.bind(this);

        this.state = {
            shots: [],
            ships: [],
            sunkShips: [],
            shipsRemaining: 0
        };
    }

    /**
     * Callback function that handles a click on the board
     *  - determines shots on enemy board
     * 
     * @callback Enemy~handleBoardClick
     * @param {number} row - row that was clicked
     * @param {number} col - column that was clicked
     */
    handleBoardClick(row, col) {
        this.setState((prevState, props) => {
            const newState = {};

            //return no changes if in placement phase
            if (props.placement) { return newState; }
            
            //return no changes if not player turn
            if (!props.playerTurn) { return newState; }
            
            //if shot already exists then return no changes 
            if (prevState.shots.some((shot)=> shot.row === row && shot.col === col)){
                return newState;
            }

            //create new shot
            const shot = {
                row: row,
                col: col,
                hit: false
            };
            
            //copy shots from prevstate to newstate
            newState.shots = prevState.shots.slice();

            //find a hit ship if it exists
            let i;
            let hitShip = prevState.ships.find((ship, index)=> {
                i = index;
                return isHit(ship, shot, props.gameConfig.shipInfo);
            });
            
            if(hitShip) {
                shot.hit = true;

                //copy ship array from prevstate to newstate
                newState.ships = prevState.ships.slice();
                //use copy of hit ship
                newState.ships[i] = hitShip = Object.assign({}, hitShip);
                
                if (--hitShip.health === 0) {
                    hitShip.sunk = true;

                    //copy sunkships and add hitship
                    newState.sunkShips = prevState.sunkShips.slice();
                    newState.sunkShips.push(hitShip);
                    
                    newState.shipsRemaining = prevState.shipsRemaining;

                    if (--newState.shipsRemaining === 0) {
                        props.onEvent.allSunk(false);
                    }
                }
            }
            
            //add shot
            newState.shots.push(shot);

            props.onEvent.turnEnd(true);

            return newState;
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
                        ships={this.state.sunkShips} />
                </Board>
                <ShipTray gameConfig={this.props.gameConfig} />
            </div>
        );
    }
}

Enemy.propTypes = {
    placement: PropTypes.bool.isRequired,
    playerTurn: PropTypes.bool.isRequired,
    onEvent: PropTypes.shape({
        ready: PropTypes.func.isRequired,
        turnEnd: PropTypes.func.isRequired,
        sunk: PropTypes.func.isRequired
    }).isRequired,
    gameConfig: PropTypes.shape({
        boardSize: PropTypes.object.isRequired,
        shipInfo: PropTypes.object.isRequired
    }).isRequired
};

export default Enemy;