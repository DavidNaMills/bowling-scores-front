import {useDispatch } from 'react-redux';
import * as actions from '../../store/allActions';


const useDispatchHook = () =>{
    const dispatch = useDispatch();

    const addNewPlayerDispatch = (data) => dispatch(actions.addPlayer(data));
    const addNewGameDispatch = (data) => dispatch(actions.addNewGame(data));
    const initGameDispatch = (data) => dispatch(actions.initGame(data));

    return {
        addNewPlayerDispatch,
        addNewGameDispatch,
        initGameDispatch
    }
}

export default useDispatchHook;