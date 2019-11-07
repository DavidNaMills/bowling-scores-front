import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import uuid from 'uuid';

import { getRandomColor } from '../useColorSelection/useColorSelection';
import useDispatchHook from '../useDispatchHook/useDispatchHook';

const defaultPlayer = {
    name: '',
    color: null
}

const defaultGameStructure = {
    players: {},
    game: {}
}


const useAddPlayer = (isNew) => {
    const tempLiveGame = useSelector(state => state.liveGame);
    const { addNewPlayerDispatch, initGameDispatch } = useDispatchHook();

    const [newPlayer, setPlayer] = useState(defaultPlayer);
    const [liveGame, setliveGame] = useState(isNew ? defaultGameStructure : tempLiveGame);  //set full game from store or create from new game object
    
    useEffect(()=>{
        if(!isNew){
            setliveGame(tempLiveGame);
        }
    }, [tempLiveGame])

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
        const tempPlayer =  JSON.parse(JSON.stringify(liveGame));

        if (newPlayer.name) {
            if (!newPlayer.id) {        //assign an id
                newPlayer.id = uuid();
            }

            if (!newPlayer.color) {     //assign random colour if not chosen one
                newPlayer.color = getRandomColor()
            }

            if (isNew) {
                tempPlayer.players[newPlayer.id] = newPlayer;
                setliveGame(tempPlayer);    //initialise a new game
            } else {
                addNewPlayerDispatch(newPlayer);    //update existing game in store
            }
            setPlayer(defaultPlayer);   //reset local state

        } else {
            alert('you fucked up');
        }
    }

    const commitGame = (cb=()=>{}) => {
        if (isNew) {
            initGameDispatch(liveGame);
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


// const useAddPlayer = (isNew) => {
//     const liveGame = useSelector(state => state.liveGame);

//     const {addNewPlayerDispatch} = useDispatchHook();
//     const [newPlayer, setPlayer] = useState(defaultPlayer);

//     const setName = (e) => {
//         const name = e.target.value;
//         setPlayer(prev => ({
//             ...prev,
//             name
//         }));
//     }

//     const addColor = (color) => {
//         setPlayer(prev => ({
//             ...prev,
//             color
//         }));
//     }


//     const addPlayer = () => {   //add id here?
//         const tempPlayer = { ...newPlayer }

//         if (tempPlayer.name) {
//             if (!tempPlayer.color) {
//                 tempPlayer.color = getRandomColor()
//             }
//             setPlayer(defaultPlayer);   //reset local state
//             addNewPlayerDispatch(tempPlayer)
//             // addNewPlayer(tempPlayer);   //dispatch

//         } else {
//             alert('you fucked up');
//         }
//     }

//     const commitGame=()=>{};

//     return {
//         liveGame,  //from store
//         newPlayer,  //individual player
//         setName,    //only sets player name
//         addColor,    //sets color
//         addPlayer,  //adds player to store
//         commitGame
//     }
// };

export default useAddPlayer;