import React, { useState, useEffect, useMemo, useCallback } from 'react';

import body from '../../../styles/shared/container.module.scss';
import form from '../../../styles/shared/form.module.scss';
import spacing from '../../../styles/shared/spacing.module.scss';
import classes from './AddPlayersForm.module.scss';

import Button from '../../../Components/StandAloneComponents/Button/Button';
import Table from '../../../Components/Table/Table';
import Input from '../../../Components/Form/elements/Input/Input';
import Title from '../../../Components/StandAloneComponents/Title/Title';

import withAxiosErrors from '../../../HOC/withAxiosErrors/withAxiosErrors';
import axios from '../../../Axios/axiosConfig';

import { playerTableStyle } from '../playerTableStyle';
import tableParser from '../../../helpers/tableGamesDataModifier/tableGamesDataModifier';

import useAddPlayer from '../../../Hooks/useAddPlayer/useAddPlayer';
import useColorSelection from '../../../Hooks/useColorSelection/useColorSelection';

const tHeaders = ['Player', 'Average', 'Pinfall'];



const AddPlayersForm = ({ title, playerSelect, onClose, isNew = false, close = () => { } }) => {
    const {
        liveGame,   //temp structure
        newPlayer,
        setName,    //only sets player name
        addColor,    //sets color
        addPlayer,
        commitGame,
    } = useAddPlayer(isNew);

    const { color, randomColor, showColorPickerComponent } = useColorSelection();
    const [showSelect, setShowSelect] = useState(false);

    useEffect(() => {
        if (color) {
            addColor(color);
        }
    }, [color]);

    const addPlayerProxy = useCallback(() => {
        setShowSelect(false);
        addPlayer();
    }, []);

    const checkDisabled = () => (Object.keys(liveGame.players).length === 0 && isNew) ? true : false;

    return (
        <div className={body.contentContainer}>
            <Title label={title} ttlType='sub' />
            <div className={form.form__container}>
                <div className={form.form__form}>

                    <Input
                        value={newPlayer.name}
                        id='name'
                        label='Players Name'
                        changed={setName}
                    />


                    {showSelect && showColorPickerComponent()}

                    <div className={[classes.addPlayers__inline, spacing.extra].join(' ')}>
                        <div className={showSelect ? classes.addPlayers__fullBtn : classes.addPlayers__halfBtn}>
                            <Button isFull type={showSelect ? 'warning' : 'lightblue'} label={showSelect ? 'Close' : 'Select Color'} click={() => setShowSelect(prev => !prev)} />
                        </div>
                        {!showSelect &&
                            <div className={classes.addPlayers__halfBtn}>
                                <Button isFull type='lightgreen' label='Random Colour' click={randomColor} />
                            </div>}
                    </div>

                    {newPlayer.color &&
                        <div
                            className={spacing.largeExtra}
                            style={{
                                marginTop: '10px',
                                marginBottom: '10px',
                                height: '30px',
                                textAlign: 'center',
                                ...playerTableStyle(newPlayer.color)
                            }}
                        >{newPlayer.name}</div>}
                    <div className={spacing.largeExtra}>
                        <Button isFull label='Add Player' type='blue' click={addPlayerProxy} isDisabled={newPlayer.name.length > 0 ? false : true} />
                    </div>
                    {isNew
                        ? <div className={spacing.largeExtra}>
                            <Button isFull label='Start Game' click={() => commitGame(close)} isDisabled={checkDisabled()} />
                        </div>
                        :
                        <div className={spacing.largeExtra}>
                            <Button isFull label={'Close'} click={onClose} />
                        </div>
                    }
                </div>
            </div>

            <div className={classes.addPlayers__width}>

                <div className={spacing.largeExtra}>
                    <Table
                        data={{
                            headers: tHeaders,
                            rows: useMemo(() => tableParser(liveGame), [])
                        }}
                        selectRow={playerSelect}
                        showRowNum
                        caption='Click player for more details'
                    />
                </div>
                <div className={spacing.largeExtra}>
                    <Button isFull type={'lightred'} label={isNew ? 'Cancel' : 'Close'} click={onClose} />
                </div>
            </div>
        </div>
    )
}

export default withAxiosErrors(AddPlayersForm, axios);