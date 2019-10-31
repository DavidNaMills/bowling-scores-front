import { renderHook, act } from '@testing-library/react-hooks';
import useFormHook from './useformHook';

import loginFormConfig from '../../formConfigs/loginFormConfig';


describe('useFormHook test suite', () => {
    const testValue = {target: {value:'myverylongpassword'}};

    it('should update the formState', () => {
        const { result } = renderHook(() => useFormHook(loginFormConfig))
        act(() => {
            result.current.manageState(testValue, 'password');
        });
        expect(result.current.formState.password.value).toEqual(testValue.target.value);
        expect(result.current.formState.password.touched).toBeTruthy()
    });


    it('should true when the form data is all valid and specifically checked', () => {
        const username = JSON.parse(JSON.stringify(loginFormConfig['username']));
        const password = JSON.parse(JSON.stringify(loginFormConfig['password']));

        username.value = 'testtest';
        password.value = 'testtest';

        const { result } = renderHook(() => useFormHook({ username, password }))
        act(() => {
            expect(result.current.completeCheck()).toBeTruthy();
        });
    });


    
    it('should return false when the form data is all valid anc specifically checked', () => {
        const username = JSON.parse(JSON.stringify(loginFormConfig['username']));
        const password = JSON.parse(JSON.stringify(loginFormConfig['password']));

        username.value = '';
        password.value = 'dsa';

        const { result } = renderHook(() => useFormHook({ username, password }))
        act(() => {
            expect(result.current.completeCheck()).toBeFalsy();
        });
    });

    it('should clear the form', ()=>{
        const username = JSON.parse(JSON.stringify(loginFormConfig['username']));
        const password = JSON.parse(JSON.stringify(loginFormConfig['password']));

        const { result } = renderHook(() => useFormHook({ username, password }))
        act(() => {
            result.current.manageState(testValue, 'password');
            result.current.manageState(testValue, 'username');

        });
        expect(result.current.formState.username.value).toEqual(testValue.target.value);
        expect(result.current.formState.password.value).toEqual(testValue.target.value);

        act(()=>{
            result.current.clearForm()
        });

        expect(result.current.formState.username.value).toEqual('');
        expect(result.current.formState.username.touched).toBeFalsy()
        expect(result.current.formState.username.isValid).toBeFalsy()
        
        expect(result.current.formState.password.value).toEqual('');
        expect(result.current.formState.password.touched).toBeFalsy();
        expect(result.current.formState.password.isValid).toBeFalsy();
    });

    it('should create a postable object', ()=>{
        const usr = 'testUsername';
        const pass = 'testPassword';

        const username = JSON.parse(JSON.stringify(loginFormConfig['username']));
        const password = JSON.parse(JSON.stringify(loginFormConfig['password']));
        
        username.value = usr;
        password.value = pass;

        const { result } = renderHook(() => useFormHook({ username, password }));
        const res = result.current.buildForm();
        expect(Object.keys(res).length).toBe(2);
        expect(res.password).toEqual(pass);
        expect(res.username).toEqual(usr);
    })

})
