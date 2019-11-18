import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import body from '../../../styles/shared/container.module.scss';
import form from '../../../styles/shared/form.module.scss';
import spacing from '../../../styles/shared/spacing.module.scss';

import useFormHook from '../../../Hooks/useFormHook/useformHook';
import useDispatchHook from '../../../Hooks/useDispatchHook/useDispatchHook';

import Title from '../../../Components/StandAloneComponents/Title/Title';
import Button from '../../../Components/StandAloneComponents/Button/Button';
import GameChart from '../../../Components/GameChart/GameChart';
import Table from '../../../Components/Table/Table';
import InputFactory from '../../../Components/Form/InputFactory/InputFactory';
import Popup from '../../../Components/StandAloneComponents/Popup/Popup';


import tableModifier from '../../../helpers/tableGamesDataModifier/tableGamesDataModifier';
import chartParser from '../../../helpers/chartDataModifier/chartDataModifier';
import singlePlayerScores from '../../../helpers/singlePlayerScores/singlePlayerScores';
import generateForm from '../../../helpers/generateAmendFormConfig/generateAmendFormConfig';
import objectToArray from '../../../helpers/objectToArray/objectToArray';

import updatesScoresModifier from '../../../helpers/updatesScoresModifier/updatesScoresModifier';

const tHeaders = ['Average', 'Pinfall']
const tHeaders2 = ['Score']



const PlayerGameDetails = (props) => {
    const {removePlayerDispatch, updateScoresDispatch} = useDispatchHook();
    const gameData = useSelector(state => state.liveGame);
    const user = useSelector(state => state.user);
    
    const id = props.location.state.id;
    let userId= null;
    if(user.token){
        userId = user.user._id;
    } 

    const { manageState, formState, buildForm } = useFormHook(generateForm(singlePlayerScores(gameData, id)));

    const isLoading = false;
    const [showEdit, setShowEdit] = useState(false);
    const [showPopup, setPopup] = useState(false);

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
        setShowEdit(prev => !prev);
    }

    const removePlayerLocal = () => {
        removePlayerDispatch(id);
        props.history.push('/game');
    }



    const buildTable = () => (
        <div className={spacing.gameDetails__extra}>
            <Table
                data={scoreData}
                showRowNum
            />
        </div>
    )

    const buildEditForm = () => {
        return (
            <div className={[spacing.extra, form.form__container].join(' ')}>
                <form onSubmit={updateScores} className={form.form__form}>
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
                    <div className={spacing.largeExtra}>
                        <Button label='Update' type='default' click={() => { }} isFull />
                    </div>
                </form>
            </div>
        )
    }

    const buildBackButton = () => (
        <div className={spacing.smallExtra}>
            <Button isFull label='Back' type='default' click={() => { props.history.goBack() }} />
        </div>
    );

    const buildPopup = () => (
        <Popup
            title={{
                label: 'Are you sure?',
                ttlType: 'sub'
            }}
            message={`You will totally remove ${gameData.players[id].name} from this game. are you sure?`}
            action1={{
                label: 'Remove',
                type: 'danger',
                click: () => { removePlayerLocal() }
            }}
            action2={{
                label: 'Cancel',
                type: 'confirm',
                click: () => setPopup(false)
            }}
        />
    )

    const buildDeleteButton = () =>(
        <div className={spacing.superLarge}>
            <Button isFull label='Remove Player' type='danger' click={() => setPopup(true)} />
        </div>
    )

    return (
        <div className={body.contentContainer}>
            {showPopup && buildPopup()}
            {buildBackButton()}
            <Title label={gameData.players[id].name} ttlType='section' />
            <div className={spacing.extra}>
                <Table data={table1} />
            </div>

            <div className={spacing.extra}>
                <GameChart
                    players={gameData.players}
                    data={chartParser(gameData, id)}
                />
            </div>

            {
                showEdit
                    ?
                    <React.Fragment>
                        {buildEditForm()}
                        <div className={spacing.largeExtra}>
                            <Button label='Close' type='danger' click={() => setShowEdit(prev => !prev)} isFull isDisabled={isLoading} />
                        </div>
                    </React.Fragment>
                    : buildTable()
            }
            {
                !showEdit &&
                <React.Fragment>
                    <div className={spacing.extra}>
                        <Button isFull label={showEdit ? 'Close' : 'Edit scores'} type='warning' click={() => { setShowEdit(prev => !prev) }} />
                    </div>

                    {buildBackButton()}
                    {userId !== id && buildDeleteButton()}
                </React.Fragment>
            }
        </div>
    )
}

export default PlayerGameDetails;