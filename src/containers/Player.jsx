import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Board from '../components/Board';
import ShipTray from '../components/ShipTray';
import {isCollision, isOutOfBounds, isHit} from '../helpers/ships';
import Ships from '../components/Ships';
import Shots from '../components/Shots';

/**
 * Player container component
 */
class Player extends PureComponent {
    constructor(props) {
        super(props);
        
        this.handleBoardClick = this.handleBoardClick.bind(this);
        this.handleShipSelect = this.handleShipSelect.bind(this);
        this.shootPlayer = this.shootPlayer.bind(this);

        this.state = {
            ships: [],
            selectedShip: undefined,
            shots: [],
            shipsRemaining: 0
        };
    }

    /**
     * Function that places a shot on the players board
     */
    shootPlayer() {
        this.setState((prevState, props)=> {
            const newState = { shots: prevState.shots.slice() };
            const {boardSize, shipInfo} = props.gameConfig;
            const shot = { hit: false };

            //randomly create shot that does not touch any other
            do {
                shot.row = Math.floor(Math.random() * boardSize.rows + 1);
                shot.col = Math.floor(Math.random() * boardSize.cols + 1);
            } while(newState.shots.some((s)=> s.row === shot.row && s.col === shot.col));

            //find a hit ship if it exists
            let i;
            let hitShip = prevState.ships.find((ship, index)=> {
                i = index;
                return isHit(ship, shot, shipInfo);
            });

            if (hitShip){
                shot.hit = true;

                //copy ship array from prevstate to newstate
                newState.ships = prevState.ships.slice();
                //use copy of hit ship
                newState.ships[i] = hitShip = Object.assign({}, hitShip);

                if (--hitShip.health === 0) {
                    hitShip.sunk = true;
                    newState.shipsRemaining = prevState.shipsRemaining;
                    if (--newState.shipsRemaining === 0) {
                        props.onEvent.allSunk(true);
                    }
                }
            }

            //addShot
            newState.shots.push(shot);
            
            setTimeout(props.onEvent.turnEnd, 1000, false);

            return newState;
        });
    }

    componentWillReceiveProps(nextProps) {
        //check if not player turn and player turn has changed
        if (!nextProps.playerTurn && this.props.playerTurn !== nextProps.playerTurn) {
            setTimeout(this.shootPlayer, 1000); 
        }
    }

    /**
     * Callback function that handles a click on the board
     * @callback Player~handleBoardClick
     * @param {number} row - row being clicked
     * @param {number} col - column being clicked
     */
    handleBoardClick(row, col) {
        this.setState((prevState, props)=> {
            const newState = {};

            //return no changes if not in placement mode
            if (!props.placement) { return newState; }
            
            //return no changes if no selected ship
            if (!prevState.selectedShip) { return newState; }

            //clone selected ship and add row and col properties
            const ship = Object.assign({row: row, col: col}, prevState.selectedShip);
            
            //calculate if ship placement is valid
            const valid = !(                     //valid if not
                isOutOfBounds(ship, props.gameConfig) || //out of bounds or
                prevState.ships.some((otherShip)=>          //if there is some other ship
                    ship.id === otherShip.id ||                 // that has the same id or
                    isCollision(ship, otherShip, props.gameConfig.shipInfo) //collides with the ship
                )
            );

            //if not valid return no changes
            if (!valid) { return newState; }

            //copy ships to new state and save the ship
            newState.ships = prevState.ships.slice();
            newState.ships.push(ship);

            //add ships remaining to new state
            newState.shipsRemaining = prevState.shipsRemaining + 1;

            //if all ships are placed notify game that player is ready
            if (newState.ships.length === Object.keys(props.gameConfig.shipInfo).length) {
                props.onEvent.ready(true);
            }
            
            return newState; 
        });
    }

    /**
     * Callback function that handles a ship being selected
     * @callback Player~handleShipSelect
     * @param {string} shipId - id of ship that is clicked
     * @param {bool} horizontal - true if ship should be horizontal
     */
    handleShipSelect(shipId, horizontal) {
        this.setState({
            selectedShip: {
                id: shipId,
                sunk: false,
                horizontal: horizontal,
                health: this.props.gameConfig.shipInfo[shipId].size
            }
        });
    }

    render() {
        return ( 
            <div className='Player'>
                <ShipTray gameConfig={this.props.gameConfig} onShipSelect={this.handleShipSelect}/>
                <Board turn={!this.props.playerTurn} 
                    gameConfig={this.props.gameConfig} onClick={this.handleBoardClick}>
                    <Ships gameConfig={this.props.gameConfig} ships={this.state.ships} 
                        noClick={true}/>
                    <Shots shots={this.state.shots} />
                </Board>
            </div>
        );
    }
}

Player.propTypes = {
    placement: PropTypes.bool.isRequired,
    playerTurn: PropTypes.bool.isRequired,
    onEvent: PropTypes.shape({
        ready: PropTypes.func.isRequired,
        turnEnd: PropTypes.func.isRequired,
        allSunk: PropTypes.func.isRequired
    }).isRequired,
    gameConfig: PropTypes.shape({
        boardSize: PropTypes.object.isRequired,
        shipInfo: PropTypes.object.isRequired
    }).isRequired
};

export default Player;