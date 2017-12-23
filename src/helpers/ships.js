function Coord(row, col, horizontal, size){
    this.row = {
        min: row,
        max: horizontal ? row : row + size - 1
    }

    this.col = {
        min: col,
        max: horizontal ? col + size - 1 : col
    }
}


export function isCollision(shipA, sizeA, shipB, sizeB) {
    const aCoord = new Coord(shipA.row, shipA.col, shipA.horizontal, sizeA);
    const bCoord = new Coord(shipB.row, shipB.col, shipB.horizontal, sizeB);

    return !(
        bCoord.col.min > aCoord.col.max ||
        bCoord.col.max < aCoord.col.min ||
        bCoord.row.min > aCoord.col.max || 
        bCoord.row.max < aCoord.row.min
    )
}