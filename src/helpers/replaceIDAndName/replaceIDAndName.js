
/**
 * for use when an anonymous game is 'claimed' by a registered user.
 * changes the players name and color to that of the registered users
 * 
 * @param {*} fullGame 
 * @param {*} selectedID 
 * @param {*} player 
 */

const replaceIDandName = (fullGame, selectedID, player) => {
    const t = typeof (fullGame) === 'string'
        ? JSON.parse(fullGame)
        : fullGame;

    let tempGame = JSON.parse(JSON.stringify(t));

    // Handle player conversion
    // const tempPlayer = JSON.parse(JSON.stringify(tempGame.players[selectedID]));
    delete tempGame.players[selectedID];
    delete tempGame._id;

    tempGame.players[player._id] = {
        color: player.color,
        name: player.name,
        id: player._id
    };



    // Handle games conversion
    for (let i in tempGame.games) {
        if (tempGame.games[i][selectedID]) {
            const t = JSON.parse(JSON.stringify(tempGame.games[i][selectedID]));
            delete tempGame.games[i][selectedID];
            tempGame.games[i][player._id] = {
                name: player.name,
                score: t.score
            };
        }
    }
    return tempGame;
}

export default replaceIDandName;