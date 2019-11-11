
const updatesScoresModifier = (data) => {
    const tempObj = {};
        for(let key in data){
            tempObj[key] = +data[key]
        }
    return tempObj;
}

export default  updatesScoresModifier;
