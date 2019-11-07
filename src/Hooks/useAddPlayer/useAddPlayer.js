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
    const [liveGame, setliveGame] = useState(isNew ? defaultGameStructure : tempLiveGame);
    
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
        console.log(isNew);
        const tempPlayer =  JSON.parse(JSON.stringify(liveGame));

        console.log(liveGame);
        console.log(tempPlayer);
        
        if (newPlayer.name) {
            if (!newPlayer.id) {
                newPlayer.id = uuid();
            }

            if (!newPlayer.color) {
                newPlayer.color = getRandomColor()
            }

            if (isNew) {
                tempPlayer.players[newPlayer.id] = newPlayer;

                console.log(tempPlayer);
                setPlayer(defaultPlayer);   //reset local state
                setliveGame(tempPlayer);
            } else {
                setPlayer(defaultPlayer);   //reset local state
                addNewPlayerDispatch(newPlayer)
            }

        } else {
            alert('you fucked up');
        }
    }

    const commitGame = (cb) => {
        if (isNew) {
            console.log(liveGame);
            initGameDispatch(liveGame.players);
            cb();
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