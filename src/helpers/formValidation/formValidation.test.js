import formValidation from './formValidation';
import loginFormConfig from '../../formConfigs/loginFormConfig';
import signupFormConfig from '../../formConfigs/signupFormConfig';

describe('formValidation test suite', ()=>{
    it('canary', ()=>{
        expect(true).toBeTruthy();
    })

    it('should return true', ()=>{
        const result = formValidation('qwerty', loginFormConfig, 'username');
        expect(result.isValid).toBeTruthy();
        expect(result.errorMsg.length).toBe(0);
    })
    
    it('should return error msg if lower bounds not met', ()=>{
        const result = formValidation('', loginFormConfig, 'username');
        expect(result.isValid).toBeFalsy();
        expect(result.errorMsg.length).toBe(1);
        expect(result.errorMsg[0]).toEqual(loginFormConfig.username.validation.minLength.errMsg);
    })

    it('should return error msg if upper bounds are crossed', ()=>{
        const result = formValidation('123456789123456789123', loginFormConfig, 'username');
        expect(result.isValid).toBeFalsy();
        expect(result.errorMsg.length).toBe(1);
        expect(result.errorMsg[0]).toEqual(loginFormConfig.username.validation.maxLength.errMsg);
    });
    
    it('should return true if passwrd and password check are equal', ()=>{
        const testPwd = 'dfwecxklcjasdkl';
        const newConfig = {
            ...signupFormConfig,
            password: {
                ...signupFormConfig.password,
                value: testPwd
            }
        };
        const result = formValidation(testPwd, newConfig, 'passwordConfirm');
        expect(result.isValid).toBeTruthy();
    })

    it('should return false and error msg if passwrd and password check are not equal', ()=>{
        const testPwd = 'dfwecxklcjasdkl';
        const newConfig = {
            ...signupFormConfig,
            password: {
                ...signupFormConfig.password,
                value: testPwd
            }
        };
        const result = formValidation('testPwd', newConfig, 'passwordConfirm');
        expect(result.isValid).toBeFalsy();
        expect(result.errorMsg.length).toBe(1);
        expect(result.errorMsg[0]).toEqual(signupFormConfig.passwordConfirm.validation.isSame.errMsg);
    })


    //TODO: update for strings and numbers
    //TODO: add isRequired - differentiate between is required and minlength

    

});