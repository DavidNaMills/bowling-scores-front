import React, { useEffect } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import Title from '../../../../Components/StandAloneComponents/Title/Title';
import FormRender from '../../FormRender/FormRender';
import useFormHook from '../../../../Hooks/useFormHook/useformHook';
import useFetchHook from '../../../../Hooks/useFetchHook/useFetchHook';
import buildSpinnerCss from '../../../../helpers/buildSpinnerCss/buildSpinnerCss';
import Spinner from '../../../../Components/Spinner/Spinner';

import axios from '../../../../Axios/axiosConfig';
import { IS_UNIQUE_USER } from '../../../../Axios/URLS';


const SignupType = (props) => {
    const { localSubmit, clear, googleSubmit, facebookSubmit, stage1Ref } = props;
    const { manageState, formState, completeCheck, clearForm, buildForm } = useFormHook(props.formConfig);
    const { isLoading, makeCall, result } = useFetchHook();

    useEffect(() => {
        if (result.data) {
            stage1Ref.current = buildForm();
            localSubmit();
        }
    }, [result])

    // put into signup?
    const verify = (e) => {
        e.preventDefault(); 
        if (completeCheck()) {
            makeCall(axios, 'GET', `${IS_UNIQUE_USER}/${formState.username.value}`);
        }
    }

    const clearLocal = () => {
        clearForm();
        props.clear();
    }

    return (
        <div>
            {isLoading && <Spinner css={buildSpinnerCss(`104, 247, 228`)} color={`104, 247, 228`} />}
            < FormRender
                submit={(e) => verify(e)}
                formState={formState}
                manageState={manageState}
                isLoading={isLoading}
                clear={clearLocal}
                label='Signup'
            />

            {/* <FacebookLogin
                appId="764202447323269"
                fields='name,email,picture'
                callback={facebookSubmit}
                render={renderProps => (
                    <button onClick={renderProps.onClick}>SIGNUP WITH FACEBOOK</button>)}
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
}

export default SignupType;