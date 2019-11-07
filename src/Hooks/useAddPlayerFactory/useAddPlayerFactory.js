import useAddPlayer from '../useAddPlayer/useAddPlayer';
import useCreateNewGameHook from '../useCreateNewGameHook/useCreateNewGameHook';

const useAddPlayerFactory = (isNew = false) => {
    let t= {
        liveGame,   //temp structure
        newPlayer,
        setName,    //only sets player name
        addColor,    //sets color
        addPlayer,
        commitGame,
    } = useCreateNewGameHook()

return t;

//     return isNew
//     ? {
//         liveGame,   //temp structure
//         newPlayer,
//         setName,    //only sets player name
//         addColor,    //sets color
//         addPlayer,
//         commitGame,
//     } = useCreateNewGameHook()

//     :{
//         liveGame,   //temp structure
//         newPlayer,
//         setName,    //only sets player name
//         addColor,    //sets color
//         addPlayer,
//         commitGame,
//     } = useAddPlayer()
};

export default useAddPlayerFactory;