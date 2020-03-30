import React, { useState, useEffect } from 'react';

import spacing from '../../../../styles/shared/spacing.module.scss';
import classes from './preferences.module.scss';

import useColorSelection from '../../../../Hooks/useColorSelection/useColorSelection';
import Button from '../../../../Components/StandAloneComponents/Button/Button';
import Title from '../../../../Components/StandAloneComponents/Title/Title';
import Input from '../../../../Components/Form/elements/Input/Input';
import { MIN_LENGTH, MAX_LENGTH } from '../../../../consts/formRestrictions';
import { playerTableStyle } from '../../../../helpers/playerTableStyle/playerTableStyle';

import axios from '../../../../Axios/axiosConfig';
import useFetchHook from '../../../../Hooks/useFetchHook/useFetchHook';
import { IS_UNIQUE_USER } from '../../../../Axios/URLS';

import buildSpinnerCss from '../../../../helpers/buildSpinnerCss/buildSpinnerCss';
import Spinner from '../../../../Components/Spinner/Spinner';


const Preferences = ({ submit, cancel, stage1Ref }) => {
    const { isLoading, makeCall, result } = useFetchHook();
    const [usrName, setUsrName] = useState({
        val: '',
        err: []
    });

    const { showColorPickerComponent, color } = useColorSelection();

    const change = (e) => {
        const t = e.target.value;
        const a = [];

        if (t.trim().length < MIN_LENGTH) {
            a.push('too_short');
            setUsrName({
                val: t,
                err: a
            });
        } else if (t.trim().length > MAX_LENGTH) {
            a.push('too_long');
            setUsrName({
                val: t,
                err: a
            });
        } else {
            setUsrName({
                val: t,
                err: []
            });
        }
    }


    useEffect(() => {
        if (result.data) {
            stage1Ref.current = {
                ...stage1Ref.current,
                color,
                username: usrName.val
            };
            submit();
        }
    }, [result])


    const verify = (e) => {
        e.preventDefault();
        if (stage1Ref.current.thirdPartyid) {
            makeCall(axios, 'GET', `${IS_UNIQUE_USER}/${usrName.val}`);
        } else {
            stage1Ref.current = {
                ...stage1Ref.current,
                color
            };
            submit();
        }
    }




    const shouldDisable = () => {
        if (stage1Ref.current.thirdPartyid) {
            return color &&
                usrName.val.length > 0
                && usrName.err.length === 0
                ? false
                : true
        } else {
            return color
                ? false
                : true
        }
    }

    return (
        <div className={classes.preferences}>

        <div className={classes.preferences_content}>
            {isLoading && <Spinner css={buildSpinnerCss(`${stage1Ref.current.color}`)} color={`${stage1Ref.current.color}`} />}
            <Title label={'Set Preferences'} ttlType='sub' />

            {stage1Ref.current.thirdPartyid &&
                <div>
                    <p>Username will be your display name</p>
                    <Input
                        value={usrName.val}
                        changed={change}
                        id='usr'
                        type='text'
                        placeholder='Username'
                        error={usrName.err}
                        isValid={usrName.val.length > 0 && usrName.err.length ? true : false}
                        isRequired={true}
                    />
                </div>
            }


            <div>
                <p>Choose Your Colour</p>
                {showColorPickerComponent()}

                <div
                    className={spacing.largeExtra}
                    style={{
                        marginTop: '10px',
                        marginBottom: '10px',
                        height: '30px',
                        textAlign: 'center',
                        ...playerTableStyle(color)
                    }}
                >{`as your name will appear: ${stage1Ref.current.username || usrName.val}`}</div>
            </div>
            <div className={spacing.largeExtra}>
                <Button label='Signup' type='default' click={verify} isDisabled={shouldDisable()} isFull>
                    {isLoading && <Spinner size={16} />}
                </Button>
                <div className={spacing.extra}>
                    <Button label='Cancel' type='lightRed' click={cancel} isFull />
                </div>
            </div>
        </div>
        </div>
    )
}

export default Preferences;