import axios from 'axios';
import {BASE} from './URLS';

const base = axios.create({
    baseURL: `${BASE}/`
});

export const  setAuthorizationToken = (token) =>{
    if(token) {
        base.defaults.headers.common['authorization'] = `bearer ${token}`;
    } else {
        delete base.defaults.headers.common['authorization'];
    }
}


export default base;