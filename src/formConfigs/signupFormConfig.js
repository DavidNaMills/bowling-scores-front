import { MIN_LENGTH, MAX_LENGTH, MAX_LENGTH_2, MIN_LENGTH_PASSWORD } from '../consts/formRestrictions';

export default {
    name: {
        elementtype: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Name'
        },
        value: '',
        validation: {
            minLength: {
                req: MIN_LENGTH,
                errMsg: 'Cant be empty'
                // errMsg: 'too_short'
            },
            maxLength: {
                req: MAX_LENGTH,
                errMsg: `Too long! maximum ${MAX_LENGTH} characters`
                // errMsg: 'too_long'
            }
        },
        touched: false,
        isValid: false,
        shouldValidate: true,
        hasErr: []
    },
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
                // errMsg: 'too_short'
            },
            maxLength: {
                req: MAX_LENGTH,
                errMsg: `Too long! maximum ${MAX_LENGTH} characters`
                // errMsg: 'too_long'
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
        validation: {
            minLength: {
                req: MIN_LENGTH_PASSWORD,
                errMsg: `Too short! minimum ${MIN_LENGTH_PASSWORD} characters`
                // errMsg: 'min_pass'
            },
            maxLength: {
                req: MAX_LENGTH,
                errMsg: `Too long! maximum ${MAX_LENGTH} characters`
            }
        },
        touched: false,
        isValid: false,
        shouldValidate: true,
        hasErr: []
    },
    passwordConfirm: {
        elementtype: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'Confirm Password'
        },
        value: '',
        validation: {
            isSame: {
                field: 'password',
                errMsg: 'Passwords not the same'
            }
        },
        touched: false,
        isValid: false,
        shouldValidate: true,
        hasErr: []
    }
}