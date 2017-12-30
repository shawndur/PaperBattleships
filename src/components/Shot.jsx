import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import '../css/Shot.css';

/**
 * Shot component
 */
class Shot extends PureComponent {
    render() {
        const styles = {
            gridArea: `${this.props.shot.row} / ${this.props.shot.col} / span 1 / span 1`
        };
        const color = this.props.shot.hit ? 'red' : 'white';
        return (
            <div className='Shot' style={styles}>
                <svg height='100' width='100'>
                    <circle cx='50%' cy='50%' r='25%' stroke='black' strokeWidth='5%' fill={color}/>
                </svg>
            </div>
        );
    }
}

Shot.propTypes = {
    shot: PropTypes.shape({
        row: PropTypes.number.isRequired,
        col: PropTypes.number.isRequired,
        hit: PropTypes.bool.isRequired
    }).isRequired
};

export default Shot;