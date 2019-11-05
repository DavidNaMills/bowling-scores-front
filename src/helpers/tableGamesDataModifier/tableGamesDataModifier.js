import { playerTableStyle } from '../../Containers/Game/playerTableStyle';


const prepPlayers = (data) =>{
    const tempObj = {};
    for(let key in data.players){
        tempObj[key] = {};
        tempObj[key].name = data.players[key].name;
        tempObj[key].values = [];
    }
    return tempObj;
}

const allBuilder = (data, tempObj) => {
    for (let game in data.games) {
        for (let player in data.games[game]) {
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
                tempObj[id].name = data.players[id].name;
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

    fin.forEach(x=>{
        if(!x.values[1]){x.values[1]=0}
        if(!x.values[2]){x.values[2]=0}
    })

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

        if(!fin[0].values[0]){fin[0].values[0]=0}
        if(!fin[0].values[1]){fin[0].values[1]=0}
    }
    return fin;
}


const parserForTableGames = (data, player = null) => {
    let tempObj = {}
    let tempArr = []
    let playerObj = prepPlayers(data);
    if (player) {
        tempObj = playerBuilder(data, player);
        tempArr = singlePlayerGameStats(data, tempObj);
    } else {
        tempObj = allBuilder(data, playerObj);
        tempArr = allPlayersGameStats(data, tempObj);
    }
    return tempArr;
}

export default parserForTableGames;