import { playerTableStyle } from '../../Containers/Game/playerTableStyle';



const allBuilder = (data) => {
    const tempObj = {};

    for (let game in data.games) {
        for (let player in data.games[game]) {

            if (!tempObj[player]) {
                tempObj[player] = {};
                tempObj[player].name = data.games[game][player].name;
                tempObj[player].values = [];

            }
            tempObj[player].values = tempObj[player].values.concat(data.games[game][player].score);
        }
    }

    return tempObj;
}


const playerBuilder = (data, id) =>{
    const tempObj = {};

    for (let game in data.games) {

            if (!tempObj[id]) {
                tempObj[id] = {};
                tempObj[id].name = data.games[game][id].name;
                tempObj[id].values = [];

            }
            if(!!data.games[game][id]){
                tempObj[id].values = tempObj[id].values.concat(data.games[game][id].score);
            }
    }

    return tempObj;
}


const allPlayersGameStats = (data, tempObj) =>{
    let fin = []
    for (let id in tempObj) {
        const trow = playerTableStyle(data.players[id].color);
        const ttl = tempObj[id].values.reduce((a, b) => a + b, 0);
        const temp = [
            tempObj[id].name,
            Math.floor(ttl / tempObj[id].values.length),
            ttl
        ];
        fin = fin.concat({ id, values: temp, style: { trow } });
    }
    return fin;
}


const singlePlayerGameStats = (data, tempObj) =>{
    let fin = []
    for (let id in tempObj) {
        const trow = playerTableStyle(data.players[id].color);
        const ttl = tempObj[id].values.reduce((a, b) => a + b, 0);
        const temp = [
            Math.floor(ttl / tempObj[id].values.length),
            ttl
        ];
        fin = fin.concat({ id, values: temp, style: { trow } });
    }
    return fin;
}


const parserForTableGames = (data, player = null) => {
    let tempObj = {}
    let tempArr = []
    if (player) {
        tempObj = playerBuilder(data, player);
        tempArr = singlePlayerGameStats(data, tempObj);
    } else {
        tempObj = allBuilder(data);
        tempArr = allPlayersGameStats(data, tempObj);
    }
    return tempArr;
}

export default parserForTableGames;