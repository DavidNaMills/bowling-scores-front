import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useFormHook from '../../../Hooks/useFormHook/useformHook';
import * as actions from '../../../store/allActions';

import Title from '../../../Components/StandAloneComponents/Title/Title';
import Button from '../../../Components/StandAloneComponents/Button/Button';
import GameChart from '../../../Components/GameChart/GameChart';
import Table from '../../../Components/Table/Table';
import InputFactory from '../../../Components/Form/InputFactory/InputFactory';

import tableModifier from '../../../helpers/tableGamesDataModifier/tableGamesDataModifier';
import chartParser from '../../../helpers/chartDataModifier/chartDataModifier';
import singlePlayerScores from '../../../helpers/singlePlayerScores/singlePlayerScores';
import generateForm from '../../../helpers/generateAmendFormConfig/generateAmendFormConfig';
import objectToArray from '../../../helpers/objectToArray/objectToArray';

import updatesScoresModifier from '../../../helpers/updatesScoresModifier/updatesScoresModifier';

const tHeaders = ['Average', 'Pinfall']
const tHeaders2 = ['Score']


const PlayerGameDetails = (props) => {
    const dispatch = useDispatch();
    const removePlayerDispatch = (id) => dispatch(actions.removePlayer(id));
    const updateScoresDispatch = (data) => dispatch(actions.updateIndividualScore(data))
    const gameData = useSelector(state=>state.liveGame);

    
    const id = props.location.state.id;
    const { manageState, formState, buildForm } = useFormHook(generateForm(singlePlayerScores(gameData, id)));
    const isLoading = false;
    const [showEdit, setShowEdit] = useState(false);

    const table1 = useMemo(() => ({
        headers: tHeaders,
        rows: tableModifier(gameData, id)
    }), [gameData, id]);

    const scoreData = useMemo(() => ({
        headers: tHeaders2,
        rows: singlePlayerScores(gameData, id)
    }), [gameData, id]);


    const updateScores = (e) => {
        e.preventDefault();
    
        const res = buildForm();
        const finalDetails = updatesScoresModifier(res)
        updateScoresDispatch({
            id,
            scores: finalDetails
        });
        setShowEdit(prev=>!prev);
    }

    const removePlayerLocal = () => {
        props.history.push('/game');
        removePlayerDispatch(id);
    }


    const buildTable = () => (
        <Table
            data={scoreData}
            showRowNum
        />
    )


    const buildEditForm = () => {
    return (
        <div>
            <form onSubmit={updateScores}>
                {
                    objectToArray(formState).map((x, i) =>
                        <InputFactory
                            key={i}
                            config={x.config}
                            id={x.id}
                            changed={manageState}
                            type='number'
                        />, 0)
                }
                <Button label='Update' type='default' click={()=>{}} isFull/>
            </form>
            <Button label='Close' type='danger' click={() => setShowEdit(prev => !prev)} isFull isDisabled={isLoading} />
        </div>
    )
            }

    return (
        <div>
            <Title label={gameData.players[id].name} ttlType='section' />
            <Table
                data={table1}
            />

            <GameChart
                players={gameData.players}
                data={chartParser(gameData, id)}
            />

            {
                showEdit
                    ? buildEditForm()
                    : buildTable()

            }
            {
                !showEdit &&
                <React.Fragment>

                    <br />
                    <Button isFull label={showEdit ? 'Close' : 'Edit scores'} type='warning' click={() => { setShowEdit(prev => !prev) }} />
                    <br />
                    <Button isFull label='Back' type='default' click={() => { props.history.goBack() }} />
                    <br />
                    <Button isFull label='Remove Player' type='danger' click={removePlayerLocal} />
                </React.Fragment>
            }
        </div>
    )
}

export default PlayerGameDetails;

/**
 *
 */
