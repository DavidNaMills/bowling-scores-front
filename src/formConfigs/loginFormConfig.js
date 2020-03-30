import { MIN_LENGTH, MAX_LENGTH, MIN_LENGTH_PASSWORD } from '../consts/formRestrictions';

export default {
    username: {
        elementtype: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Screen name'
        },
        value: '',
        validation: {
            minLength: {
                req: MIN_LENGTH,
                errMsg: 'Cant be empty'
                // errMsg: 'login_err1'
            },
            maxLength: {
                req: MAX_LENGTH,
                errMsg: 'Too Long! maximum 20 characters'
                // errMsg: 'login_err2'
            }
        },
        touched: false,
        isValid: false,
        shouldValidate: true,
        hasErr: []
    },
    password: {
        elementtype: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'Password'
        },
        value: '',
        isValid: false,
        validation: {
            minLength: {
                req: MIN_LENGTH_PASSWORD,
                errMsg: 'Cant be empty'
                // errMsg: 'login_err1'
            },
            maxLength: {
                req: MAX_LENGTH,
                errMsg: 'Too Long! Maximum 20 characters'
                // errMsg: 'login_err2'
            }
        },
        touched: false,
        shouldValidate: true,
        hasErr: []
    }
}