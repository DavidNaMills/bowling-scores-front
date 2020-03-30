import React, { useState } from 'react';
import classes from './SelectAnonPlayer.module.scss';
import spacing from '../../../styles/shared/spacing.module.scss';


import Title from '../../../Components/StandAloneComponents/Title/Title';
import Table from '../../../Components/Table/Table';
import Button from '../../../Components/StandAloneComponents/Button/Button';

import pinfallSort from '../../../helpers/pinfallSort/pinfallSort';
import tableParser from '../../../helpers/tableGamesDataModifier/tableGamesDataModifier';
import { playerTableStyle } from '../../../Containers/Game/playerTableStyle';
import useLocalStorage from '../../../Hooks/useLocalStorage/useLocalStorage';

const label1 = 'Please select the name you played as'

const tHeaders = ['Player', 'Average', 'Pinfall'];

const SelectAnonPlayer = (props) => {
    const { removeFromStorage } = useLocalStorage();
    const {
        game,
        cancelClick,
        submitClick
    } = props;

    const [sel, setSel] = useState(null)

    return (
        <div>
            <Title label={label1} />
            <Table
                data={{
                    headers: tHeaders,
                    rows: pinfallSort(tableParser(game))
                }}
                caption='Select Yourself'
                selectRow={setSel}
            />

            {sel &&
                    <p className={spacing.largeExtra} style={{ ...playerTableStyle(game.players[sel].color), padding: '10px', textAlign: 'center' }}>
                        {`Selected Player: ${game.players[sel].name}`}
                    </p>
            }

            <div className={spacing.largeExtra}>
                <Button click={() => submitClick(sel)} label={'Submit'} isDisabled={!sel ? true : false} type='lightgreen' isFull />
            </div>
            <div className={spacing.extra}>
                <Button click={()=>{
                    removeFromStorage();
                    cancelClick();
                }
                } label={'Cancel'} type='lightred' isFull />
            </div>
        </div>
    )
}

export default SelectAnonPlayer;