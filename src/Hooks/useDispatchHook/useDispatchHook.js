import {useDispatch } from 'react-redux';
import * as actions from '../../store/allActions';


const useDispatchHook = () =>{
    const dispatch = useDispatch();

    //Game actions
    const addNewPlayerDispatch = (data) => dispatch(actions.addPlayer(data));
    const addNewGameDispatch = (data) => dispatch(actions.addNewGame(data));
    const initGameDispatch = (data) => dispatch(actions.initGame(data));
    const commitNewGameDispatch = (data) => dispatch(actions.commitNewGame(data));

    const removePlayerDispatch = (id) => dispatch(actions.removePlayer(id));
    const updateScoresDispatch = (data) => dispatch(actions.updateIndividualScore(data))

    //User actions
    const loginUserDispatch = (data) => dispatch(actions.userLogin(data));
    const logoutUserDispatch = () => dispatch(actions.userLogout())

    return {
        addNewPlayerDispatch,
        addNewGameDispatch,
        initGameDispatch,
        commitNewGameDispatch,
        
        removePlayerDispatch,
        updateScoresDispatch,

        loginUserDispatch,
        logoutUserDispatch
    }
}

export default useDispatchHook;