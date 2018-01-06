import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import '../css/Ship.css';

/**
 * Ship component
 */
class Ship extends PureComponent {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.props.onClick) {
            this.props.onClick(this.props.ship.id);
        }
    }

    render() {
        const {id, horizontal, row, col} = this.props.ship;
        const {img, size} = this.props.gameConfig.shipInfo[id];
        const clickHandler = this.props.onClick ? this.handleClick : undefined;
        
        const styles = {
            gridArea: `${row} / ${col} / ` + (horizontal ? `span 1 / span ${size}` :
                `span ${size} / span 1`)
        };

        if (this.props.noClick) { styles.pointerEvents = 'none'; }
        
        return (
            <div className='Ship' onClick={clickHandler} style={styles}>
                <img className={horizontal ? 'horizontal' : 'vertical'} 
                    src={img} alt='a paper ship' />
            </div>
        );
    }
}

Ship.propTypes = {
    onClick: PropTypes.func,

    noClick: PropTypes.bool,

    ship: PropTypes.shape({
        id: PropTypes.string.isRequired,
        horizontal: PropTypes.bool.isRequired,
        sunk: PropTypes.bool.isRequired,
        row: PropTypes.number.isRequired,
        col: PropTypes.number.isRequired
    }).isRequired,

    gameConfig: PropTypes.shape({
        shipInfo: function(props, propName, componentName, location, propFullName) {
            const prop = props[propName];

            //check that prop is an object and exists
            if (prop === 'null' || typeof prop !== 'object') {
                return new Error(
                    `Invalid prop ${propFullName} supplied to ${componentName}.`
                    + ' Expected an object'
                );
            }

            //check shape of each item in prop
            for (let shipId in prop) {
                //expected shape of each item in prop 
                let shape = {
                    size: 'number',
                    name: 'string',
                    img: 'string'
                };

                for (let key in shape){
                    //check that item in prop has expected property
                    if (typeof prop[shipId][key] !== shape[key]) {
                        return new Error(
                            `Invalid prop ${propFullName}.${shipId}.${key} supplied to ${componentName}.`
                            + ` Expected an ${shape[key]}`
                        );
                    }
                }
            }
        }
    }).isRequired
};

export default Ship;