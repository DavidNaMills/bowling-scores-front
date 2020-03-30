import React, { useEffect } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import axios from '../../../Axios/axiosConfig';
import withAxiosErrors from '../../../HOC/withAxiosErrors/withAxiosErrors';

import useFetchHook from '../../../Hooks/useFetchHook/useFetchHook';
import useFormHook from '../../../Hooks/useFormHook/useformHook';
import useDispatchHook from '../../../Hooks/useDispatchHook/useDispatchHook';
import buildSpinnerCss from '../../../helpers/buildSpinnerCss/buildSpinnerCss';

import Title from '../../../Components/StandAloneComponents/Title/Title';
import Spinner from '../../../Components/Spinner/Spinner';

import FormRender from '../FormRender/FormRender';
import Anime, { anime } from 'react-anime';


const Login = (props) => {
    const { loginUserDispatch } = useDispatchHook();
    const { manageState, formState, completeCheck, clearForm, buildForm } = useFormHook(props.formConfig);
    const { isLoading, makeCall, result } = useFetchHook();


    // useEffect(() => {
    //     makeCall(axios, 'POST', props.url, {
    //         username: 'superballs',
    //         password: '123456789'
    //     });
    // }, [])

    useEffect(() => {
        if (result.error) {
            clearForm();
        }
        if (result.data) {
            loginUserDispatch(result.data);
        }
    }, [result])

    const submit = (e) => {
        e.preventDefault();
        const valid = completeCheck();
        if (valid) {
            makeCall(axios, 'POST', props.url, buildForm());
        }
    };

    const facebookSubmit = (fbObj) => {
        makeCall(axios, 'POST', props.url, {
            password: `${fbObj.name}${fbObj.userID}${fbObj.name}`,
            username: fbObj.userID
        });
    }

    const googleSubmit = (gglObj) => {
        makeCall(axios, 'POST', props.url, {
            password: `${gglObj.profileObj.givenName}${gglObj.profileObj.googleId}${gglObj.profileObj.familyName}`,
            username: gglObj.profileObj.googleId
        });
    }

    const clear = () => {
        clearForm();
    };

    return (
        <div>
            {isLoading && <Spinner css={buildSpinnerCss(`104, 247, 228`)} color={`104, 247, 228`} />}

            {/* <Anime scale={[.1, 1]}> */}
                <Title label={`Bowling Scores: ${props.title}`} ttlType='section' />
            {/* </Anime> */}

            <FormRender
                submit={submit}
                formState={formState}
                manageState={manageState}
                isLoading={isLoading}
                clear={clear}
                label='Login'
            />
            {/* <br />
            <br />
            <FacebookLogin
                appId="764202447323269"
                fields='name,email,picture'
                callback={facebookSubmit}
            />
            <br />
            <br />
            <br />


            <GoogleLogin
                clientId="1034122787852-m1tvksv2f0rjeefpsigorl89lju8q4mn.apps.googleusercontent.com"
                buttonText="LOGIN WITH GOOGLE"
                onSuccess={googleSubmit}
                onFailure={googleSubmit}
            /> */}
        </div>
    )
};

export default withAxiosErrors(Login, axios);