import { useState } from 'react';

import {getRandomColor} from '../useColorSelection/useColorSelection';
import useDispatchHook from '../useDispatchHook/useDispatchHook';

const defaultPlayer = {
    name: '',
    color: null
}


const useAddPlayer = () => {
    const {addNewPlayerDispatch} = useDispatchHook();
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


    const addPlayer = () => {
        const tempPlayer = { ...newPlayer }


        // create hook to manage this?
        //dont pass function in, just access hook


        if (tempPlayer.name) {
            if (!tempPlayer.color) {
                tempPlayer.color = getRandomColor()
            }
            setPlayer(defaultPlayer);   //reset local state
            addNewPlayerDispatch(tempPlayer)
            // addNewPlayer(tempPlayer);   //dispatch

        } else {
            alert('you fucked up');
        }
    }

    return {
        newPlayer,
        setName,
        addPlayer,
        addColor
    }
};

export default useAddPlayer;