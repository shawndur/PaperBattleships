import React from 'react';
import Ship from './Ship';
import '../css/ShipTray.css'

const ShipTray = (props) => {
    return(
        <div className='ShipTray-container'>
            <div className='ShipTray'>
                <Ship row={1} col={1} size={5}/>
                <Ship row={2} col={1} size={4}/>
                <Ship row={3} col={1} size={3}/>
                <Ship row={3} col={4} size={3}/>
                <Ship row={2} col={5} size={2}/>
            </div>
        </div>
    );
}

export default ShipTray;