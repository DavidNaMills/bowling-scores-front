import React, { useState, useEffect } from 'react';
import ErrorMessage from '../../Components/StandAloneComponents/ErrorMessage/ErrorMessage';

const withAxiosErrors = (WrappedComponent, axios) => {
    return (props) => {
        const [msg, setMsg] = useState(null);

        const resInterceptor = axios.interceptors.response.use(res => {
            setMsg(null);


            return res;
        },
            error => {
                const status = error.response.status;
                const cutStr = error.response.config.url.slice(error.config.url.lastIndexOf('/')+1, error.response.config.url.length);

                if(status===401 && cutStr==='login'){
                    setMsg('Invalid Username or Password');
                }
                else if(status === 401){
                    setMsg('Unauthorized');
                }
                else {
                    setMsg('Something went wrong. we are sorry. someone will be fired');
                }
                window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
                return Promise.reject(error);
            }
        );


        useEffect(() => {
            return () => {
                axios.interceptors.response.eject(resInterceptor)
            }
        }, [resInterceptor]);


        return (
            <React.Fragment>
                {msg && <ErrorMessage msg={msg}/>}
                <WrappedComponent {...props} />
            </React.Fragment>
        )
    }
}

export default withAxiosErrors;