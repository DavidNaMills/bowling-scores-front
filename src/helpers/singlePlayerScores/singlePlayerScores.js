
const singlePlayerScores = (data, id)=>{
    //[score]
    let tempArr = [];
    for(let key in data.games){
        if(data.games[key][id]){
            console.log(data.games[key][id].score);
            tempArr = tempArr.concat({values: [data.games[key][id].score]});
        }
    }
    return tempArr;
};

export default singlePlayerScores;