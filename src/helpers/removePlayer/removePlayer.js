
export const removePlayerHelper = (gameObj, playerId) =>{
    const temp = JSON.parse(JSON.stringify(gameObj))
    delete temp.players[playerId];

    for (let k in temp.games) {
        delete temp.games[k][playerId]
    }

    return temp;
}