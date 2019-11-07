import {useEffect} from 'react';

const defaultFileName = 'bowling-scores-temp'

const useLocalStorage = (file=defaultFileName) => {

    const writeToLocalStorage = (data) => {
        try{
            localStorage.removeItem(file);
            localStorage.setItem(file, data);
        }catch(err){
            console.log(err);
        }
    }
    
    
    const readFromLocalStorage = () => {
        try{
            return localStorage.getItem(file);
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