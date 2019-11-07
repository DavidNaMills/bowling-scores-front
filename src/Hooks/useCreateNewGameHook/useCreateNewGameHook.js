import {useState} from 'react';
import uuid from 'uuid';
import useDispatchHook from '../useDispatchHook/useDispatchHook';
import {getRandomColor} from '../useColorSelection/useColorSelection';

const defaultPlayer = {
    name: '',
    color: null
}


const useCreateNewGameHook = () => {
    const {initGameDispatch} = useDispatchHook()
    const [liveGame, setliveGame] = useState({});
    const [newPlayer, setPlayer] = useState(defaultPlayer);

    const setName = (e) => {
        const name = e.target.value;
        setPlayer(prev => ({
            ...prev,
            name
        }));
    }

    const addColor = (color) => {
        setPlayer(prev => ({
            ...prev,
            color
        }));
    }


    const addPlayer = () =>{
        const tempPlayer = { ...liveGame };

        if(!newPlayer.id){
            newPlayer.id = uuid(); 
        }

        if (newPlayer.name) {
            if (!newPlayer.color) {
                newPlayer.color = getRandomColor()
            }
            
            tempPlayer[newPlayer.id] = newPlayer;
            setliveGame(tempPlayer);
        }

        console.log(tempPlayer);
    }

    const commitGame = () =>{
        initGameDispatch(liveGame);
    }

    return {
        liveGame,   //temp structure
        newPlayer,
        setName,    //only sets player name
        addColor,    //sets color
        addPlayer,
        commitGame
    }
}

export default useCreateNewGameHook;