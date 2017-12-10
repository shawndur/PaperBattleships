import React from 'react';
import '../../css/Circle.css'

const Circle = (props) => {
    return (
        <svg className='Circle' height='100' width='100'>
            <circle cx='50%' cy='50%' r='25%' stroke='black' strokeWidth='3' fill={props.color}/>
        </svg>
    );
}

export default Circle