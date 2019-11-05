
const scoreFormCreator = (data) =>{
    const temp = {};
    for(let key in data){
        temp[key] = {
            name: data[key].name,
            score: 0
        }
    }

    return temp;
}

export default scoreFormCreator;

//[playerId]{
    //name: ''
    //sore: 0
//}