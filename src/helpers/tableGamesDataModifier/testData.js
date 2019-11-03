const david = { id: 123, name: 'David' };
const paul = { id: 456, name: 'Paul' };
const kelby = { id: 852, name: 'Kelby' };

export const stats = {
    [david.id]: {
        name: david.name,
        ave: 166,
        pinfall: 500
    },
    [paul.id]: {
        name: paul.name,
        ave: 181,
        pinfall: 545
    },
    [kelby.id]: {
        name: kelby.name,
        ave: 89,
        pinfall: 178
    }
}

export const davidScores = [156, 144, 200];

/**
 * STRUCTURE FOR SAVING GAME DETAILS
 */
export default {
    players: {
        [david.id]:{
            name: david.name,
            color: '18, 255, 235'
        },
        [paul.id]: {
            name: paul.name,
            color: '56, 168, 52'
        },
        [kelby.id]: {
            name: kelby.name,
            color: '192, 102, 217'
        }
    },

    games: {
        1: {
            [david.id]: {
                name: david.name,
                score: 156
            },
            [paul.id]: {
                name: paul.name,
                score: 248
            },
            [kelby.id]: {
                name: kelby.name,
                score: 78
            }
        },
        2: {
            [david.id]: {
                name: david.name,
                score: 144
            },
            [paul.id]: {
                name: paul.name,
                score: 165
            },
            [kelby.id]: {
                name: kelby.name,
                score: 100
            }
        },
        3: {
            [david.id]: {
                name: david.name,
                score: 200
            },
            [paul.id]: {
                name: paul.name,
                score: 132
            }
        }
    }
};