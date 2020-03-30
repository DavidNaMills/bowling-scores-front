import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import classes from './PlayerGameDetails.module.scss';

import body from '../../../styles/shared/container.module.scss';
import form from '../../../styles/shared/form.module.scss';
import spacing from '../../../styles/shared/spacing.module.scss';
import { isMobileOnly, isTablet, withOrientationChange } from 'react-device-detect';
import useFormHook from '../../../Hooks/useFormHook/useformHook';
import useDispatchHook from '../../../Hooks/useDispatchHook/useDispatchHook';

import Title from '../../../Components/StandAloneComponents/Title/Title';
import Button from '../../../Components/StandAloneComponents/Button/Button';
import GameChart from '../../../Components/GameChart/GameChart';
import Table from '../../../Components/Table/Table';
import InputFactory from '../../../Components/Form/InputFactory/InputFactory';
import Popup from '../../../Components/StandAloneComponents/Popup/Popup';
import AreYouSure from '../../../Components/StandAloneComponents/PopupComponents/AreYouSure';


import tableModifier from '../../../helpers/tableGamesDataModifier/tableGamesDataModifier';
import chartParser from '../../../helpers/chartDataModifier/chartDataModifier';
import singlePlayerScores from '../../../helpers/singlePlayerScores/singlePlayerScores';
import generateForm from '../../../helpers/generateAmendFormConfig/generateAmendFormConfig';
import objectToArray from '../../../helpers/objectToArray/objectToArray';

import updatesScoresModifier from '../../../helpers/updatesScoresModifier/updatesScoresModifier';
import useToggle from '../../../Hooks/useToggle/useToggle';

const tHeaders = ['Average', 'Pinfall']
const tHeaders2 = ['Score']

const defaultShowState = {
    showEdit: false,
    showPopup: false
}

const PlayerGameDetails = (props) => {
    const id = props.location.state.id;


    const { removePlayerDispatch, updateScoresDispatch } = useDispatchHook();
    const state = useSelector(state => state);
    const gameData = state.liveGame;
    const user = state.user;

    if (Object.keys(gameData.players).length === 0) {
        props.history.push('/');
    }

    const length = props.location.state.length;

    let userId = null;
    if (user.token) {
        userId = user.user._id;
    }
    const { toggle, makeToggle } = useToggle(defaultShowState);
    const { manageState, formState, buildForm } = useFormHook(generateForm(singlePlayerScores(gameData, id)));

    const isLoading = false;


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
        makeToggle('showEdit');
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
        <Popup>
            <AreYouSure
                message1={`You will totally remove ${gameData.players[id].name} from this game. are you sure?`}
                dangerLbl={'Are you sure?'}
                safeLbl={'Cancel'}
                dangerClick={() => {
                    removePlayerDispatch(id);
                    props.history.push('/game');
                }}
                safeClick={() => makeToggle('showPopup')}

            />
        </Popup>
    )

    const buildDeleteButton = () => (
        <div id='buildDelete' className={spacing.superLarge}>
            <Button isFull label='Remove Player' type='danger' click={() => makeToggle('showPopup')} />
        </div>
    )

    let width = 0

    if (isMobileOnly) {
        width = props.isPortrait
            ? (window.innerWidth - 50)
            : (window.innerWidth - 100);
    } else if (isTablet) {
        width = props.isPortrait
            ? 700
            : 800;
    } else {
        width = 800;
    }

    return (
        <div className={body.contentContainer}>
            {(toggle.showPopup && length > 1) && buildPopup()}

            <div className={classes.playerDetails__width}>
                {buildBackButton()}
            </div>

            <Title label={gameData.players[id].name} ttlType='section' />

            <div className={[spacing.extra, classes.playerDetails__width].join(' ')}>
                <Table data={table1} />
            </div>

            <div className={[spacing.extra, body.centerDiv].join(' ')}>
                <GameChart
                    players={gameData.players}
                    data={chartParser(gameData, id)}
                    width={width}
                />
            </div>

            <div className={classes.playerDetails__width}>

                {
                    toggle.showEdit
                        ?
                        <React.Fragment>
                            {buildEditForm()}
                            <div className={spacing.largeExtra}>
                                <Button label='Close' type='danger' click={() => makeToggle('showEdit')} isFull isDisabled={isLoading} />
                            </div>
                        </React.Fragment>
                        : buildTable()
                }
                {
                    !toggle.showEdit &&
                    <React.Fragment>
                        <div className={spacing.extra}>
                            <Button isFull label={toggle.showEdit ? 'Close' : 'Edit scores'} type='warning' click={() => { makeToggle('showEdit') }} />
                        </div>

                        {buildBackButton()}
                        {(userId !== id && length > 1) && buildDeleteButton()}
                    </React.Fragment>
                }
            </div>

        </div>
    )
}

export default withOrientationChange(PlayerGameDetails);