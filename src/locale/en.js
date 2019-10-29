import {MIN_LENGTH, MAX_LENGTH, MAX_LENGTH_2, MIN_LENGTH_PASSWORD} from '../consts/formRestrictions';


export default {
    user_name: 'Username',
    user_pass: 'Password',
    user_alley: 'Bowling alley name',
    user_pass_confirm: 'Confirm password',

    login_err1: 'Login Error',
    login_err2: 'Login Error',
    item_required: 'Field is required',

    too_short: `Minimum of ${MIN_LENGTH} characters`,
    min_pass: `Minimum of ${MIN_LENGTH_PASSWORD} characters`,
    too_long: `Maximum of ${MAX_LENGTH} characters`,
    max_length_2: `Maximum of ${MAX_LENGTH_2} characters`,

    pass_not_same: 'Passwords are not the same'
}