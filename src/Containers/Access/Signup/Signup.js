import React, { useEffect, useState, useRef } from 'react';

import axios from '../../../Axios/axiosConfig';
import withAxiosErrors from '../../../HOC/withAxiosErrors/withAxiosErrors';

import useFormHook from '../../../Hooks/useFormHook/useformHook';
import useDispatchHook from '../../../Hooks/useDispatchHook/useDispatchHook';
import useFetchHook from '../../../Hooks/useFetchHook/useFetchHook';

import buildSpinnerCss from '../../../helpers/buildSpinnerCss/buildSpinnerCss';

import Title from '../../../Components/StandAloneComponents/Title/Title';
import Spinner from '../../../Components/Spinner/Spinner';

import SignupType from './SignupType/SignupType';
import Preferences from './Preferences/Preferences';


const Signup = (props) => {
    const stage1Ref = useRef();
    const { loginUserDispatch } = useDispatchHook();
    const { isLoading, makeCall, result } = useFetchHook();
    const [stage, setStage] = useState(true);

    useEffect(() => {
        if (result.data) {
            loginUserDispatch(result.data);
        }
    }, [result])


    const localSubmit = () => {
        setStage(false);
    };

    const facebookSubmit = (fbObj) => {
        stage1Ref.current = {
            name: fbObj.name,
            thirdPartyid: fbObj.userID,
            // avatar: fbObj.picture.data.url,      need to download and save?
            email: fbObj.email,
            password: `${fbObj.name}${fbObj.userID}${fbObj.name}`
        };
        setStage(false);
    };

    const googleSubmit = (gglObj) => {
        stage1Ref.current = {
            name: `${gglObj.profileObj.givenName} ${gglObj.profileObj.familyName}`,
            thirdPartyid: gglObj.profileObj.googleId,
            avatar: gglObj.profileObj.imageUrl,
            email: gglObj.profileObj.email,
            password: `${gglObj.profileObj.givenName}${gglObj.profileObj.googleId}${gglObj.profileObj.familyName}`,
        };

        setStage(false);
    };

    const fullSubmit = () => {
        const toPost = !stage1Ref.current.thirdPartyid ? {
            ...stage1Ref.current,
            thirdPartyid: stage1Ref.current.username
        }
            : stage1Ref.current
        makeCall(axios, 'POST', props.url, toPost);
    }

    const clear = () => {
        setStage(true);
    };



    return (
        <div>
            {isLoading && <Spinner css={buildSpinnerCss(`${stage1Ref.current.color}`)} color={`${stage1Ref.current.color}`} center/>}
            <Title label={`Bowling Scores: ${props.title}`} ttlType='section' />
            {
                stage ?
                    <SignupType
                        formConfig={props.formConfig}
                        localSubmit={localSubmit}
                        clear={clear}
                        facebookSubmit={facebookSubmit}
                        googleSubmit={googleSubmit}
                        stage1Ref={stage1Ref}
                    />
                    : <Preferences
                        submit={fullSubmit}
                        cancel={clear}
                        stage1Ref={stage1Ref}
                    />
            }
        </div>
    )
};


export default withAxiosErrors(Signup, axios);