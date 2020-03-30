
const pinfallSort = (data) =>{
    console.log('[pinfall]');
    return data.sort((a, b)=>{
        
        if(a.values[2] > b.values[2]) return -1;
        if(a.values[2] < b.values[2]) return 1;
    })
}

export default pinfallSort;