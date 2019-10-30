import { renderHook, act } from '@testing-library/react-hooks';
import useFormHook from './useformHook';

import loginFormConfig from '../../formConfigs/loginFormConfig';


describe('useFormHook test suite', () => {

    it('should update the formState', () => {
        const testValue = 'myverylongpassword';
        const { result } = renderHook(() => useFormHook(loginFormConfig))
        act(() => {
            result.current.manageState('password', testValue);
        });
        expect(result.current.formState.password.value).toEqual(testValue);
        expect(result.current.formState.password.touched).toBeTruthy()
    });


    it('should set error messages if the value is invalid', () => {
        const testValue = 'thisisasuperlongpasswordthatwillbetoolong';
        const { result } = renderHook(() => useFormHook(loginFormConfig))
        act(() => {
            result.current.manageState('password', testValue);
        });
        expect(result.current.formState.password.value).toEqual('');
        expect(result.current.formState.password.hasErr.length).toBe(1);
        expect(result.current.formState.password.touched).toBeTruthy()
    });

    it('should true when the form data is all valid anc specifically checked', () => {
        const username = loginFormConfig['username'];
        const password = loginFormConfig['password'];

        username.isValid = true;
        password.isValid = true;

        const { result } = renderHook(() => useFormHook({ username, password }))
        act(() => {
            expect(result.current.completeCheck()).toBeTruthy();
        });
    });

    it('should false when the form data is all valid anc specifically checked', () => {
        const username = loginFormConfig['username'];
        const password = loginFormConfig['password'];

        username.isValid = true;
        password.isValid = false;

        const { result } = renderHook(() => useFormHook({ username, password }))
        act(() => {
            expect(result.current.completeCheck()).toBeFalsy();
        });
    });
})
