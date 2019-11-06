import React, { useState } from 'react';
import { SwatchesPicker } from 'react-color';

import Button from '../../../Components/StandAloneComponents/Button/Button';
import Table from '../../../Components/Table/Table';
import Input from '../../../Components/Form/elements/Input/Input';

import { playerTableStyle } from '../playerTableStyle';
import tableParser from '../../../helpers/tableGamesDataModifier/tableGamesDataModifier';

const defaultPlayer = {
    name: '',
    color: null
}
const tHeaders = ['Player', 'Average', 'Pinfall'];


const getRandomColor = () => {
    const max = 255;
    const min = 0;

    const r = Math.floor(Math.random() * (max - min + 1) + min);
    const g = Math.floor(Math.random() * (max - min + 1) + min);
    const b = Math.floor(Math.random() * (max - min + 1) + min);

    return `${r}, ${g}, ${b}`;
}



const AddPlayersForm = ({ addNewPlayer, liveGame, playerSelect, onClose }) => {
    const [newPlayer, setPlayer] = useState(defaultPlayer);
    const [showSelect, setShowSelect] = useState(false);

    /**
     * place swatchColor and random color in hook
     */
    const swatchColor = (color, event) => {
        const selColor = `${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}`
        setPlayer(prev => ({
            ...prev,
            color: selColor
        }));
        setShowSelect(false);
    }

    const randomColor = () => {
        const selColor = getRandomColor();
        setPlayer(prev => ({
            ...prev,
            color: selColor
        }));
    }

    /****************************************/


    const setName = (e, id) => {
        const name = e.target.value;
        setPlayer(prev => ({
            ...prev,
            name
        }));
    }


    const addPlayer = () => {
        const tempPlayer = { ...newPlayer }
        if (tempPlayer.name) {
            if (!tempPlayer.color) {
                tempPlayer.color = getRandomColor()
            }
            setPlayer(defaultPlayer);   //reset local state
            addNewPlayer(tempPlayer);   //dispatch
        } else {
            alert('you fucked up');
        }
    }

    return (
        <div>
            <Input
                value={newPlayer.name}
                id='name'
                label='Players Name'
                changed={setName}
            />

            {
                showSelect &&
                <SwatchesPicker
                    onChangeComplete={swatchColor}
                />
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


            <Button
                label='Add Player'
                click={addPlayer}
            />

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