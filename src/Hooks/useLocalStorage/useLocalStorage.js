import {useEffect} from 'react';
import {writeToLocalStorage, readFromLocalStorage, removeFromLocalStorage} from '../../helpers/localStorage/localStorage';
import {LOCAL_STORAGE_FILE} from '../../consts/localStorageFilename';

const useLocalStorage = (file=LOCAL_STORAGE_FILE) => {

    const writeToStorage = (data) => {
        writeToLocalStorage(file, data);
    }
    
    
    const readFromStorage = () => {
        return readFromLocalStorage(file);
    }
    
    const removeFromStorage = (data) =>{
        removeFromLocalStorage(file, data);
    }


    return {
        writeToStorage,
        readFromStorage,
        removeFromStorage
    }
};

export default useLocalStorage;