import Galleon from '../res/Galleon.svg';
import Frigate from '../res/Frigate.svg';
import Corvette from '../res/Corvette.svg';
import Schooner from '../res/Schooner.svg';
import Brig from '../res/Brig.svg';

/**
 * Object holding configurations for the game
 */
const GameConfig = {
    multiPlayer: false,
    boardSize: {
        rows: 10,
        cols: 10
    },
    shipInfo: { 
        ac: {
            name: 'Galleon',
            size: 5, 
            img: Galleon
        },
        bs: {
            name: 'Frigate',
            size: 4, 
            img: Frigate
        },
        cs: {
            name: 'Corvette',
            size: 3, 
            img: Corvette
        },
        sb: {
            name: 'Brig',
            size: 3, 
            img: Brig
        },
        ds: {
            name: 'Schooner',
            size: 2, 
            img: Schooner
        }
    }
};

export default GameConfig;