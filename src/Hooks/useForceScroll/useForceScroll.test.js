import { renderHook } from '@testing-library/react-hooks';
import useForceScroll from './useForceScroll';

window.scrollTo = jest.fn();

afterEach(() => {
    jest.clearAllMocks();
});

describe('useForceScroll test suite', () => {
    it('should invoke the window.scrollTo method when invoked when position is provided', () => {
        const position = 666;

        renderHook(() => useForceScroll(position));
        expect(window.scrollTo).toHaveBeenCalledTimes(1);
        expect(window.scrollTo).toHaveBeenCalledWith({
            behaviour: 'smooth',
            top: position
        });
    });

    it('should invoke the window.scrollTo method when invoked when position is provided', () => {
        renderHook(() => useForceScroll());
        expect(window.scrollTo).toHaveBeenCalledTimes(0);
    });
});