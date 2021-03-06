import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import uuid from 'uuid';

import { getRandomColor } from '../useColorSelection/useColorSelection';
import useDispatchHook from '../useDispatchHook/useDispatchHook';
import useTime from '../useTime/useTime';

const defaultPlayer = {
    name: '',
    color: null
}

const defaultGameStructure = {
    players: {},
    games: {}
}


const useAddPlayer = (isNew) => {
    const tempLiveGame = useSelector(state => state.liveGame);
    const loggedInUser = useSelector(state => state.user.user);

    const { addNewPlayerDispatch, initGameDispatch, commitNewGameDispatch } = useDispatchHook();
    const { getTime } = useTime();

    const [newPlayer, setPlayer] = useState(defaultPlayer);
    const [liveGame, setliveGame] = useState(isNew ? defaultGameStructure : tempLiveGame);  //set full game from store or create from new game object

    useEffect(() => {
        if (!isNew) {
            setliveGame(tempLiveGame);
        }
    }, [tempLiveGame]);


    useEffect(()=>{
        if(isNew && loggedInUser ){
            const tempPlayer = JSON.parse(JSON.stringify(liveGame));
            const newPlayer = {};
            newPlayer.name=loggedInUser.username;
            newPlayer.color=loggedInUser.color;
            tempPlayer.players[loggedInUser._id] = newPlayer;
            setliveGame(tempPlayer);
        }
    }, [isNew]);


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
        const tempPlayer = JSON.parse(JSON.stringify(liveGame));

        if (newPlayer.name) {
            if (!newPlayer.id) {        //assign an id
                newPlayer.id = uuid();
            }

            if (!newPlayer.color) {     //assign random colour if not chosen one
                newPlayer.color = getRandomColor()
            }

            if (isNew) {
                tempPlayer['date'] = getTime();
                tempPlayer.players[newPlayer.id] = newPlayer;
                setliveGame(tempPlayer);    //initialise a new game
            } else {
                addNewPlayerDispatch(newPlayer);    //update existing game in store
            }
            setPlayer(defaultPlayer);   //reset local state

        } else {
            return true;
        }
    }

    const commitGame = (cb = () => { }) => {
        if (isNew) {
            commitNewGameDispatch(liveGame);
            cb();   //optional callback. used in this case to change back to game view
        }
    };

    return {
        liveGame,  //from store
        newPlayer,  //individual player
        setName,    //only sets player name
        addColor,    //sets color
        addPlayer,  //adds player to store
        commitGame
    }
};

export default useAddPlayer;