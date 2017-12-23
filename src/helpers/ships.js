function Coord(ship, shipInfo){
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


export function isCollision(shipA, shipB, shipInfo) {
    const aCoord = new Coord(shipA, shipInfo);
    const bCoord = new Coord(shipB, shipInfo);

    return !(
        bCoord.col.min > aCoord.col.max ||
        bCoord.col.max < aCoord.col.min ||
        bCoord.row.min > aCoord.col.max || 
        bCoord.row.max < aCoord.row.min
    );
}

export function isOutOfBounds(ship, boardSize, shipInfo) {
    const coord = new Coord(ship, shipInfo);
    return (
        coord.row.min <= 0 || 
        coord.col.min <= 0 ||
        coord.row.max > boardSize.rows ||
        coord.col.max > boardSize.cols
    );
}