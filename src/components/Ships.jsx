import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Ship from './Ship';

/**
 * Component that renders ships from an array of ships
 */
class Ships extends PureComponent {
    render() {

        return this.props.ships.map((ship)=>
            <Ship 
                key={ship.id} noClick={this.props.noClick} 
                ship={ship} onClick={this.props.onClick} 
                gameConfig={this.props.gameConfig} 
            />
        );
    }
}

Ships.propTypes = {
    ships: PropTypes.arrayOf(PropTypes.object).isRequired,
    gameConfig: PropTypes.object.isRequired,
    noClick: PropTypes.bool,
    onClick: PropTypes.func
};

export default Ships;