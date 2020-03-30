import replaceIDandName from '../../../../helpers/replaceIDAndName/replaceIDAndName';
import useDispatchHook from '../../../../Hooks/useDispatchHook/useDispatchHook';

const useSubmitAnonPlayer = ({existingGame, user, changeShow }) =>{
    const { commitNewGameDispatch } = useDispatchHook();
    const makeSubmit = (id)=>{
        const temp = replaceIDandName(existingGame.current, id, user.user);
        commitNewGameDispatch(temp);
        changeShow('gameDetails');
    };

    return {
        makeSubmit
    }
}

export default useSubmitAnonPlayer;