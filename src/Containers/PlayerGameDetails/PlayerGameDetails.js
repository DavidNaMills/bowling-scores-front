import React, { useMemo, useState } from 'react';

import Title from '../../Components/StandAloneComponents/Title/Title';
import Button from '../../Components/StandAloneComponents/Button/Button';
import GameChart from '../../Components/GameChart/GameChart';
import Table from '../../Components/Table/Table';
import InputFactory from '../../Components/Form/InputFactory/InputFactory';

import tableModifier from '../../helpers/tableGamesDataModifier/tableGamesDataModifier';
import chartParser from '../../helpers/chartDataModifier/chartDataModifier';
import singlePlayerScores from '../../helpers/singlePlayerScores/singlePlayerScores';
import generateForm from '../../helpers/generateAmendFormConfig/generateAmendFormConfig';
import objectToArray from '../../helpers/objectToArray/objectToArray';

const tHeaders = ['Average', 'Pinfall']
const tHeaders2 = ['Score']


const PlayerGameDetails = (props) => {
    const id = useMemo(() => props.location.state.id);
    const gameData = useMemo(() => props.location.state.gameData);
    const isLoading = false;

    const [showEdit, setShowEdit] = useState(false);

    const table1 = useMemo(() => ({
        headers: tHeaders,
        rows: tableModifier(gameData, id)
    }));

    const scoreData = useMemo(() => ({
        headers: tHeaders2,
        rows: singlePlayerScores(gameData, id)
    }));


    const tempClick = () => {

    }


    const buildTable = () => (
        <Table
            data={scoreData}
            showRowNum
        />
    )

    const buildForm = () => (
        <div>
            <form onSubmit={tempClick}>
                {
                    objectToArray(generateForm(scoreData.rows)).map((x, i) =>
                        <InputFactory
                            key={i}
                            config={x.config}
                            id={x.id}
                            changed={tempClick}
                        />, 0)
                }
                <Button label='Update' type='default' click={tempClick} isFull isDisabled={isLoading} />
            </form>
            <Button label='Close' type='danger' click={() => setShowEdit(prev => !prev)} isFull isDisabled={isLoading} />
        </div>
    )

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
                    ? buildForm()
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
                    <Button isFull label='Remove Player' type='danger' click={() => { alert('delete player') }} />
                </React.Fragment>
            }
        </div>
    )
}

export default PlayerGameDetails;

/**
 *
 */
