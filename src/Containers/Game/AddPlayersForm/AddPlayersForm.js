import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import Button from '../../../Components/StandAloneComponents/Button/Button';
import Table from '../../../Components/Table/Table';
import Input from '../../../Components/Form/elements/Input/Input';
import Title from '../../../Components/StandAloneComponents/Title/Title';

import { playerTableStyle } from '../playerTableStyle';
import tableParser from '../../../helpers/tableGamesDataModifier/tableGamesDataModifier';

import useAddPlayer from '../../../Hooks/useAddPlayer/useAddPlayer';
import useColorSelection from '../../../Hooks/useColorSelection/useColorSelection';

const tHeaders = ['Player', 'Average', 'Pinfall'];



const AddPlayersForm = ({ title, playerSelect, onClose, isNew = false, close = () => { } }) => {
    // const liveGame = useSelector(state => state.liveGame);
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


    return (
        <div>
            <Title label={title} ttlType='sub' />
            <Input
                value={newPlayer.name}
                id='name'
                label='Players Name'
                changed={setName}
            />

            {
                showSelect && showColorPickerComponent()

            }
            <Button label={showSelect ? 'Close' : 'Select Color'} click={() => setShowSelect(prev => !prev)} />
            <Button label='Random Colour' click={randomColor} />
            {newPlayer.color &&
                <div
                    style={{
                        marginTop: '10px',
                        marginBottom: '10px',
                        height: '30px',
                        textAlign: 'center',
                        ...playerTableStyle(newPlayer.color)
                    }}
                >{newPlayer.name}</div>}


            <Button label='Add Player' click={addPlayer} />
            {isNew && <Button label='Start Game' click={() => commitGame(close)} />}
            <Table
                data={{
                    headers: tHeaders,
                    rows: tableParser(liveGame)
                }}
                selectRow={playerSelect}
                showRowNum
                caption='Click player for more details'
            />
            <Button label='Close' click={onClose} />
        </div>
    )
}

export default AddPlayersForm;