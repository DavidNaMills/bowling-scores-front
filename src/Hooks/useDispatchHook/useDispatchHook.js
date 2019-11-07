import {useDispatch } from 'react-redux';
import * as actions from '../../store/allActions';


const useDispatchHook = () =>{
    const dispatch = useDispatch();

    const addNewPlayerDispatch = (data) => dispatch(actions.addPlayer(data));
    const addNewGameDispatch = (data) => dispatch(actions.addNewGame(data));
    
    return {
        addNewPlayerDispatch,
        addNewGameDispatch
    }
}

export default useDispatchHook;