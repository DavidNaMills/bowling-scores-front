import {MIN_LENGTH, MAX_LENGTH, MIN_LENGTH_PASSWORD} from '../consts/formRestrictions';

export default {
    username: {
        elementtype: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'user_name'
        },
        value: '',
        validation: {
            minLength: {
                req: MIN_LENGTH,
                errMsg: 'login_err1'
            },
            maxLength: {
                req: MAX_LENGTH,
                errMsg: 'login_err2'
            }
        },
        touched: false,
        isValid: false,
        shouldValidate: true
    },
    password: {
        elementtype: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'user_pass'
        },
        value: '',
        isValid: false,
        validation: {
            minLength: {
                req: MIN_LENGTH_PASSWORD,
                errMsg: 'login_err1'
            },
            maxLength: {
                req: MAX_LENGTH,
                errMsg: 'login_err2'
            }
        },
        touched: false,
        shouldValidate: true
    }
}