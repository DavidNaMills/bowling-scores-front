import {useEffect} from 'react';

const defaultFileName = 'bowling-scores-temp'

const useLocalStorage = (file=defaultFileName) => {

    const writeToLocalStorage = (data) => {
        try{
            console.log('writing to local storage');
            localStorage.clear(file);
            localStorage.setItem(file, JSON.stringify(data));
        }catch(err){
            console.log(err);
        }
    }
    
    
    const readFromLocalStorage = () => {
        try{
            const temp = localStorage.getItem(file);
            console.log(temp);
            return temp;
        }catch(err){
            return null;
            console.log(err);
        }
    }
    
    const removeFromLocalStorage = (data) =>{
        try{
            localStorage.removeItem(file, data);
        }catch(err){
            return null;
            console.log(err);
        }
    }


    return {
        writeToLocalStorage,
        readFromLocalStorage,
        removeFromLocalStorage
    }
};

export default useLocalStorage;