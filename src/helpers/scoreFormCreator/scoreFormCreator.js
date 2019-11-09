
const scoreFormCreator = (data) =>{
    const temp = {};
    for(let key in data){
        temp[key] = {
            name: data[key].name,
            score: ''
        }
    }

    return temp;
}

export default scoreFormCreator;