import {useState, useEffect} from 'react';
import scoreFormCreator from '../../helpers/scoreFormCreator/scoreFormCreator';


const useScoreInput = (players) =>{
    const [values, setValues] = useState(null);

    useEffect(()=>{
        const t = scoreFormCreator(players)
        setValues(t);
    }, [players]);

    const addValue = (addObj) =>{
        const temp = JSON.parse(JSON.stringify(values));
        temp[addObj.id].score = parseInt(addObj.data);
        setValues(temp);
    }

    return {
        values,
        addValue
    }
}

export default useScoreInput;