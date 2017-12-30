import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import '../css/Squares.css';

class Squares extends PureComponent {
    render() {
        const {rows, cols} = this.props;

        //generate a div square for each coordinate of the board 
        const squares = [];
        for (let i=1; i<=rows; ++i) {
            for (let j=1; j<=cols; ++j) {
                squares.push(
                    <div 
                        className='square' key={i+','+j} id={i+','+j}
                        style={{ gridArea: `${i} / ${j} / span 1 / span 1` }}
                    />
                );
            }
        }

        return squares;
    }
}

Squares.propTypes = {
    rows: PropTypes.number.isRequired,
    cols: PropTypes.number.isRequired
};

export default Squares;