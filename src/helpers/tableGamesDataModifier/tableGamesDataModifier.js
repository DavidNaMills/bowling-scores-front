import {playerTableStyle} from '../../Containers/Game/playerTableStyle';

const parserForTableGames = (data) => {
    const tempObj = {};
    let first = true;

    for (let game in data.games) {
        for (let player in data.games[game]) {
            
            if(!tempObj[player]){
                tempObj[player] = {};
                tempObj[player].name= data.games[game][player].name;
                tempObj[player].values = [];

            }
            tempObj[player].values = tempObj[player].values.concat(data.games[game][player].score);
        }
    }

    let fin = []
    for (let id in tempObj) {
        const trow =playerTableStyle(data.players[id].color);
        
        //TODO: move below to function for calculating the game stats
        const ttl = tempObj[id].values.reduce((a, b)=>a+b, 0);
        const temp = [
            tempObj[id].name,
            Math.floor(ttl/tempObj[id].values.length),
            ttl
        ];
        fin = fin.concat({ id, values: temp, style:{trow}});
    }
    return fin;
}

export default parserForTableGames;