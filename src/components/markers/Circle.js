import React from 'react';
import PropTypes from 'prop-types';
import '../../css/Circle.css'

const Circle = (props) => {
    return (
        <div className='Circle'>
            <svg height='100' width='100'>
                <circle cx='50%' cy='50%' r='25%' stroke='black' strokeWidth='5%' fill={props.color}/>
            </svg>
        </div>
    );
}

Circle.propTypes = {
    color: PropTypes.string.isRequired
}

export default Circle