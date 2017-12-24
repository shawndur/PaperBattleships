import React, {Component} from 'react';
import Board from '../components/Board';
import ShipTray from '../components/ShipTray';
import {isCollision, isHit} from '../helpers/ships';
import Shot from '../components/Shot';
import Ship from '../components/Ship';

/**
 * Enemy container component
 */
class Enemy extends Component {
    constructor(props) {
        super(props);
        
        this.handleBoardClick = this.handleBoardClick.bind(this);

        this.state = {
            shots: [],
            ships: []
        }
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
        }

        //use functional setstate since we need prevstate to calculate nextstate
        this.setState((prevState, props) => {
            const {shots, ships} = prevState;
            const {shipInfo} = props.gameConfig;

            //if shot does not already exist
            if (!prevState.shots.some((shot)=> shot.row === row && shot.col === col)){
                
                //find a hit ship if it exists
                const hitShip = ships.find((ship)=> isHit(ship, shot, shipInfo));
                
                //if there is a hit ship change shot to a hit and lower ship health
                if(hitShip) {
                    shot.hit = true;
                    hitShip.sunk = --hitShip.health <= 0;
                }

                shots.push(shot);
            }

            return {
                shots: shots,
                ships: ships
            }
        });
    }
    
    /**
     * Called when component is mounted
     *  - Generates enemy ships
     */
    componentWillMount() {
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
            }

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
            ships: ships
        });

        //notify game that all ships are placed
        this.props.onReady(false);
    }

    render() {
        //generate shot elements
        const shots = this.state.shots.map((shot)=>
            <Shot key={shot.row+','+shot.col} shot={shot} />
        );

        //generate ship elements for sunk ships
        const sunkShips = this.state.ships.reduce((res,ship)=> {
            if (ship.sunk) {
                res.push(<Ship key={ship.id} noClick={true} ship={ship} 
                               gameConfig={this.props.gameConfig} />);
            }
            return res;
        }, []);

        return ( 
            <div className='Enemy'>
                <Board gameConfig={this.props.gameConfig} onClick={this.handleBoardClick} >
                    {shots}
                    {sunkShips}
                </Board>
                <ShipTray gameConfig={this.props.gameConfig} />
            </div>
        );
    }
}

export default Enemy;