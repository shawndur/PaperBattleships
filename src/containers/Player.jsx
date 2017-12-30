import React, {Component} from 'react';
import Board from '../components/Board';
import ShipTray from '../components/ShipTray';
import {isCollision, isOutOfBounds, isHit} from '../helpers/ships';
import Ships from '../components/Ships';
import Shots from '../components/Shots';

/**
 * Player container component
 */
class Player extends Component {
    constructor(props) {
        super(props);
        
        this.handleBoardClick = this.handleBoardClick.bind(this);
        this.handleShipSelect = this.handleShipSelect.bind(this);

        this.state = {
            ships: [],
            selectedShip: undefined,
            shots: [],
            shipsRemaining: 0
        };
    }

    shootPlayer() {
        this.setState((prevState, props)=> {
            const {ships, shots} = prevState;
            let {shipsRemaining} = prevState;
            const {boardSize, shipInfo} = props.gameConfig;
            const shot = { hit: false };

            //randomly create shot that does not touch any other
            do {
                shot.row = Math.floor(Math.random() * boardSize.rows + 1);
                shot.col = Math.floor(Math.random() * boardSize.cols + 1);
            } while(shots.some((other)=> other.row === shot.row && other.col === shot.col));

            //check if ship was hit
            const hitShip = ships.find((ship)=> isHit(ship, shot, shipInfo));
            if (hitShip){
                shot.hit = true;
                if (--hitShip.health === 0) {
                    hitShip.sunk = true;
                    if (--shipsRemaining === 0) {
                        props.onEvent.allSunk(true);
                    }
                }
            }

            shots.push(shot);
            props.onEvent.turnEnd(false);

            return {
                shots: shots,
                ships: ships,
                shipsRemaining: shipsRemaining
            };
        });
    }

    componentWillReceiveProps(nextProps) {
        //check if not player turn and player turn has changed
        if (!nextProps.playerTurn && this.props.playerTurn !== nextProps.playerTurn) {
            this.shootPlayer(); 
        }
    }

    /**
     * Callback function that handles a click on the board
     * @callback Player~handleBoardClick
     * @param {number} row - row being clicked
     * @param {number} col - column being clicked
     */
    handleBoardClick(row, col) {
        //use functional setstate since nextstate depends on prevstate
        this.setState((prevState, props)=> {
            const {ships, selectedShip} = prevState;
            let {shipsRemaining} = prevState;
            const gameConfig = props.gameConfig;

            //if there is a selected ship
            if (selectedShip) {
                //clone selected ship and add row and col properties
                const ship = Object.assign({row: row, col: col}, selectedShip);
                
                //calculate if ship placement is valid
                const valid = !(                     //valid if not
                    isOutOfBounds(ship, gameConfig) || //out of bounds or
                    ships.some((otherShip)=>           //if there is some other ship
                        ship.id === otherShip.id ||      // that has the same id or
                        isCollision(ship, otherShip, gameConfig.shipInfo) //collides with the ship
                    )
                );

                //if the ship placement is valid
                if (valid) {
                    //save the ship
                    ships.push(ship);

                    ++shipsRemaining;

                    //if all ships are placed notify game that player is ready
                    if (ships.length === Object.keys(gameConfig.shipInfo).length) {
                        props.onEvent.ready(true);
                    }
                }
            }
            
            return { 
                ships: ships, 
                shipsRemaining: shipsRemaining
            };
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
                <Board gameConfig={this.props.gameConfig} onClick={this.handleBoardClick}>
                    <Ships gameConfig={this.props.gameConfig} ships={this.state.ships} 
                        noClick={true}/>
                    <Shots shots={this.state.shots} />
                </Board>
            </div>
        );
    }
}

export default Player;