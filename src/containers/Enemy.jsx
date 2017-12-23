import React, {Component} from 'react';
import Board from '../components/Board';
import ShipTray from '../components/ShipTray';
import {isCollision, isHit} from '../helpers/ships';
import Shot from '../components/Shot';
import Ship from '../components/Ship';

class Enemy extends Component {
    constructor(props) {
        super(props);
        
        this.handleBoardClick = this.handleBoardClick.bind(this);

        this.state = {
            shots: [],
            ships: []
        }
    }

    handleBoardClick(row, col) {
        const {shots, ships} = this.state;
        const shipInfo = this.props.gameConfig.shipInfo;
        
        if (shots.some((shot)=> shot.row === row && shot.col === col)) { return; }

        const shot = {
            row: row,
            col: col,
        }
        
        const hitShip = ships.find((ship)=> isHit(ship, shot, shipInfo));

        if (hitShip) {
            shot.hit = true;
            hitShip.sunk = --hitShip.health <= 0;
        } else {
            shot.hit = false;
        }

        shots.push(shot);

        this.setState({
            shots: shots,
            ships: ships
        });
    }
    
    componentWillMount() {
        const {shipInfo, boardSize} = this.props.gameConfig;
        const ships = [];

        for (let shipId in shipInfo) {
            const ship = {
                id: shipId, 
                sunk: false,
                horizontal: Math.round(Math.random()) === 0,
                health: shipInfo[shipId].size
            }

            const maxRow = ship.horizontal ? boardSize.rows : 
                boardSize.rows - shipInfo[shipId].size + 1;
            const maxCol = ship.horizontal ? boardSize.cols - shipInfo[shipId].size + 1 :
                boardSize.cols;

            do {
                ship.row = Math.floor(Math.random() * maxRow + 1);
                ship.col = Math.floor(Math.random() * maxCol + 1);
            } while (ships.some((otherShip)=>isCollision(ship, otherShip, shipInfo)));

            ships.push(ship);
        }

        this.setState({
            ships: ships
        });

        this.props.onReady(false);
    }

    render() {
        const shots = this.state.shots.map((shot)=>
            <Shot key={shot.row+','+shot.col} shot={shot} />
        );

        const sunkShips = this.state.ships.reduce((res,ship)=> {
            if (ship.sunk) {
                res.push(<Ship key={ship.id} ship={ship} gameConfig={this.props.gameConfig} />);
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