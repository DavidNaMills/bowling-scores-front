import { renderHook, act } from '@testing-library/react-hooks';
import useFetchHook from './useFetchHook';

import axios from 'axios';
jest.mock('axios');
axios.mockResolvedValue();
jest.useFakeTimers();

const testTitle = ['This is a test'];
const url = '/testpost'

describe('useFetchHook test suite', () => {
    it('should make a post to the server', () => {
        const { result } = renderHook(() => useFetchHook());

        act(() => {
            result.current.makeCall(axios, 'POST', url, testTitle);
            jest.runAllTimers();
        });

        expect(axios)
            .toHaveBeenCalledWith({ url, method: 'POST', data: testTitle });
    });

})