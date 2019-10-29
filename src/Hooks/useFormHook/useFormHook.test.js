import { renderHook, act } from '@testing-library/react-hooks';
import useFormHook from './useformHook';

import loginFormConfig from '../../formConfigs/loginFormConfig';


describe('useFormHook test suite', ()=>{

    it('should update the formState', ()=>{
        const testValue = 'myverylongpassword';
        const { result } = renderHook(() => useFormHook( loginFormConfig))
        act(()=>{
            result.current.manageState('password', testValue);
        });
        expect(result.current.formState.password.value).toEqual(testValue);
        expect(result.current.formState.password.touched).toBeTruthy()
    });

    it('should set error messages if the value is invalid', ()=>{
        
    })

})
