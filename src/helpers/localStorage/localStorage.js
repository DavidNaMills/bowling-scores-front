const defaultFileName = 'file';

export const writeToLocalStorage = (file = defaultFileName, data) => {
    try{
        localStorage.clear(file);
        localStorage.setItem(file, JSON.stringify(data));
    }catch(err){
        console.log(err);
    }
}


export const readFromLocalStorage = (file = defaultFileName, data) => {
    try{
        const temp = localStorage.getItem(file);
        return temp;
    }catch(err){
        return null;
    }
}

export const removeFromLocalStorage = (file = defaultFileName, data) =>{
    try{
        localStorage.removeItem(file, data);
    }catch(err){
        return null;
        console.log(err);
    }
}