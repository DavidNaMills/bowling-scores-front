import React, { useState, useEffect } from 'react';
import ErrorMessage from '../../Components/StandAloneComponents/ErrorMessage/ErrorMessage';

const withAxiosErrors = (WrappedComponent, axios) => {
    return (props) => {
        const [msg, setMsg] = useState(null);

            const reqInterceptor = axios.interceptors.request.use(req => {
                    return req;
            },
            error=>{
                return error;
            });



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
                else if(status === 409){
                    setMsg('Username has been taken');
                }
                else if(status === 500){
                    setMsg('Something has went wrong');
                }
                else {
                    setMsg(`${error.response.data.message}`);
                }
                window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
                return Promise.reject(error);
            }
        );


        useEffect(() => {
            return () => {
                axios.interceptors.response.eject(resInterceptor)
                axios.interceptors.request.eject(reqInterceptor)
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