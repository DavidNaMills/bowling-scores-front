import { useLayoutEffect } from 'react';

const useForceScroll = (position = null) => {
    useLayoutEffect(() => {
        if (position) {
            console.log('[useForceScroll]');
            window.scrollTo({
                behaviour: 'smooth',
                top: position
            });
        }
    }, [position]);
    return null;
}

export default useForceScroll;