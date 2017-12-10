import React from 'react';
import Grid from  './Grid/Grid';
import Ship from './Ship';
import '../css/ShipTray.css'

const ShipTray = (props) => {
    return(
        <div className='ShipTray'>
            <Grid rows={3} columns={6}>
                <Ship row={1} col={1} size={5}/>
                <Ship row={2} col={1} size={4}/>
                <Ship row={3} col={1} size={3}/>
                <Ship row={3} col={4} size={3}/>
                <Ship row={2} col={5} size={2}/>
            </ Grid>
        </div>
    );
}

export default ShipTray;