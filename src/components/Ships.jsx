import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Ship from './Ship';
/**
 * @todo change to a pure component
 */
/**
 * Component that renders ships from an array of ships
 */
class Ships extends Component {
    render() {
        const ships = this.props.ships.reduce((res,ship)=> {
            if (ship.sunk) {
                res.push(
                    <Ship 
                        key={ship.id} noClick={this.props.noClick} ship={ship} 
                        gameConfig={this.props.gameConfig} 
                    />
                );
            }
            return res;
        }, []);

        return ships;
    }
}

Ships.propTypes = {
    ships: PropTypes.arrayOf(PropTypes.object).isRequired,
    gameConfig: PropTypes.object.isRequired,
    noClick: PropTypes.bool
};

export default Ships;