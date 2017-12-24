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

function collides(aCoord, bCoord) {
    return !(
        bCoord.col.min > aCoord.col.max ||
        bCoord.col.max < aCoord.col.min ||
        bCoord.row.min > aCoord.row.max || 
        bCoord.row.max < aCoord.row.min
    );
}

export function isCollision(shipA, shipB, shipInfo) {
    const aCoord = new ShipCoord(shipA, shipInfo);
    const bCoord = new ShipCoord(shipB, shipInfo);

    return collides(aCoord, bCoord);
}

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

export function isHit(ship, shot, shipInfo) {
    const shipCoord = new ShipCoord(ship, shipInfo);
    const shotCoord = new Coord(shot.row, shot.row, shot.col, shot.col);
    return collides(shipCoord, shotCoord);
}