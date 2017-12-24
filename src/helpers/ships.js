/**
 * Creates a shipcoord object representing coordinates (shape) of a ship
 * @constructor
 * @param {*} ship - ship to be used to generate coordinates
 * @param {*} shipInfo - used to get length of ship
 */
function ShipCoord(ship, shipInfo){
    const {row, col, horizontal, id} = ship;
    const size = shipInfo[id].size;

    this.row = {
        min: row,
        max: horizontal ? row : row + size - 1
    }

    this.col = {
        min: col,
        max: horizontal ? col + size - 1 : col
    }
}

/**
 * Creates a coord object representing coordinates (shape)
 * @constructor 
 * @param {number} rowMin - lowest occupied row (top)
 * @param {number} rowMax - highest occupied row (bottom)
 * @param {number} colMin - lowest occupied column (left)
 * @param {number} colMax - highest occupied column (right)
 */
function Coord(rowMin, rowMax, colMin, colMax) {
    this.row = {
        min: rowMin,
        max: rowMax
    }
    
    this.col = {
        min: colMin,
        max: colMax
    }
}

/**
 * Checks if two coordinates collide (touch)
 * @param {Coord|ShipCoord} aCoord - first coordinate to compare  
 * @param {Coord|ShipCoord} bCoord - second coordinate to compare
 * @returns {bool} - true if collision false otherwise
 */
function collides(aCoord, bCoord) {
    return !(
        bCoord.col.min > aCoord.col.max ||
        bCoord.col.max < aCoord.col.min ||
        bCoord.row.min > aCoord.row.max || 
        bCoord.row.max < aCoord.row.min
    );
}

/**
 * Checks if two ships collide
 * @param {*} shipA - first ship to check 
 * @param {*} shipB - second ship to check
 * @param {*} shipInfo - information about ships
 * @returns {bool} - true if collision false otherwise
 */
export function isCollision(shipA, shipB, shipInfo) {
    const aCoord = new ShipCoord(shipA, shipInfo);
    const bCoord = new ShipCoord(shipB, shipInfo);

    return collides(aCoord, bCoord);
}

/**
 * Checks if a ship is out of bounds
 * @param {*} ship - ship to check
 * @param {*} gameConfig - board and ship info
 * @returns {bool} - true if out of bounds false otherwise
 */
export function isOutOfBounds(ship, gameConfig) {
    const {shipInfo, boardSize} = gameConfig;
    const coord = new ShipCoord(ship, shipInfo);
    return (
        coord.row.min <= 0 || 
        coord.col.min <= 0 ||
        coord.row.max > boardSize.rows ||
        coord.col.max > boardSize.cols
    );
}

/**
 * Checks if a ship is hit by (collides with) a shot
 * @param {*} ship - ship to check
 * @param {*} shot - shot to check 
 * @param {*} shipInfo - information about ship
 * @returns {bool} - true on hit false otherwise
 */
export function isHit(ship, shot, shipInfo) {
    const shipCoord = new ShipCoord(ship, shipInfo);
    const shotCoord = new Coord(shot.row, shot.row, shot.col, shot.col);
    return collides(shipCoord, shotCoord);
}