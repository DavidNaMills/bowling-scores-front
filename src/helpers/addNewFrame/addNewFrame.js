export const addNewFrame = (gameObj, newFrame, key=null) => {
    const tempScore = JSON.parse(JSON.stringify(newFrame));
    const tempState2 = JSON.parse(JSON.stringify(gameObj));
    const tempKey = key ? key : Object.keys(gameObj.games).length + 1;

    for (let k in tempScore) {
        if (+tempScore[k].score > 0) {
            tempScore[k].score = +tempScore[k].score;
        } else {
            delete tempScore[k];
        }
    }
    tempState2.games[`${tempKey}`] = tempScore;
    return tempState2;
}