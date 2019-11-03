
// {game: 1, david: 258, paul: 100, mike: 123,},






const allPlayers = (data) => {
    let tempArray = [];
    let players = [];

    for (let key in data.games) {
        const temp = {};
        temp.game = key;

        for (let player in data.games[key]) {
            temp[data.games[key][player].name] = data.games[key][player].score
        }
        tempArray = tempArray.concat(temp);
    }

    for (let ply in data.players) {
        players = players.concat(ply);
    }

    return {
        data: tempArray,
        players
    }
}

const singlePlayer = (data, id) => {
    let tempArray = [];

    for (let key in data.games) {
        const temp = {};
        temp.game = key;
        if (data.games[key][id]) {
            temp[data.games[key][id].name] = data.games[key][id].score
            tempArray = tempArray.concat(temp);
        }
    }

    return {
        data: tempArray,
        players: [id]
    }
}

const chartDataModifier = (data, player = null) => {
    if (player) {
        return singlePlayer(data, player);
    } else {
        return allPlayers(data);
    }
}

export default chartDataModifier;

