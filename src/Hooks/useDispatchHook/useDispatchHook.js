import {useDispatch } from 'react-redux';
import * as actions from '../../store/allActions';


const useDispatchHook = () =>{
    const dispatch = useDispatch();

    const addNewPlayerDispatch = (data) => dispatch(actions.addPlayer(data));
    const addNewGameDispatch = (data) => dispatch(actions.addNewGame(data));
    const initGameDispatch = (data) => dispatch(actions.initGame(data));
    const removePlayerDispatch = (id) => dispatch(actions.removePlayer(id));
    const updateScoresDispatch = (data) => dispatch(actions.updateIndividualScore(data))

    return {
        addNewPlayerDispatch,
        addNewGameDispatch,
        initGameDispatch,
        removePlayerDispatch,
        updateScoresDispatch
    }
}

export default useDispatchHook;