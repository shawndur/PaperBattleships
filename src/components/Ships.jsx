import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Ship from './Ship';

/**
 * Component that renders ships from an array of ships
 */
class Ships extends PureComponent {
    render() {
        const ships = this.props.ships.map((ship)=>
            <Ship 
                key={ship.id} noClick={this.props.noClick} ship={ship} 
                gameConfig={this.props.gameConfig} 
            />
        );

        return ships;
    }
}

Ships.propTypes = {
    ships: PropTypes.arrayOf(PropTypes.object).isRequired,
    gameConfig: PropTypes.object.isRequired,
    noClick: PropTypes.bool
};

export default Ships;