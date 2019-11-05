
const singlePlayerScores = (data, id)=>{
    //[score]
    let tempArr = [];
    for(let key in data.games){
        if(data.games[key][id]){
            tempArr = tempArr.concat({values: [data.games[key][id].score]});
        }
    }
    return tempArr;
};

export default singlePlayerScores;