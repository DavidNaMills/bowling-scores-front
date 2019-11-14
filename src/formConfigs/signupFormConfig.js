import { MIN_LENGTH, MAX_LENGTH, MAX_LENGTH_2, MIN_LENGTH_PASSWORD } from '../consts/formRestrictions';

export default {
    name: {
        elementtype: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'name'
        },
        value: '',
        validation: {
            minLength: {
                req: MIN_LENGTH,
                errMsg: 'too_short'
            },
            maxLength: {
                req: MAX_LENGTH,
                errMsg: 'too_long'
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
            placeholder: 'user_name'
        },
        value: '',
        validation: {
            minLength: {
                req: MIN_LENGTH,
                errMsg: 'too_short'
            },
            maxLength: {
                req: MAX_LENGTH,
                errMsg: 'too_long'
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
            placeholder: 'user_pass'
        },
        value: '',
        validation: {
            minLength: {
                req: MIN_LENGTH_PASSWORD,
                errMsg: 'min_pass'
            },
            maxLength: {
                req: MAX_LENGTH,
                errMsg: 'too_long'
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
            placeholder: 'user_pass_confirm'
        },
        value: '',
        validation: {
            isSame: {
                field: 'password',
                errMsg: 'pass_not_same'
            }
        },
        touched: false,
        isValid: false,
        shouldValidate: true,
        hasErr: []
    }
}