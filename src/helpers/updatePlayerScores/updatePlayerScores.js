
export const updatePlayerScores = (gameObj, playerId, newScores) => {
    const tempScore = JSON.parse(JSON.stringify(gameObj));
    for (let k in newScores) {
        if (+newScores[k] > 0) {
            tempScore.games[k][playerId].score = +newScores[k];
        } else {
            delete tempScore.games[k][playerId];
        }
    }

    return tempScore;
}