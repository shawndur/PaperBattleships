import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Shot from './Shot';

/**
 * Component that renders shots from an array
 */
class Shots extends PureComponent {
    render(){
        const shots = this.props.shots.map((shot)=>
            <Shot key={shot.row+','+shot.col} shot={shot} />
        );

        return shots;
    }
}

Shots.propTypes = {
    shots: PropTypes.arrayOf(
        PropTypes.shape({
            row: PropTypes.number.isRequired,
            col: PropTypes.number.isRequired
        })
    ).isRequired
};

export default Shots;