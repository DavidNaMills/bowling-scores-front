import {useLayoutEffect} from 'react';


const useBodyLock = (position=0) => {
    useLayoutEffect(() => {
        window.scrollTo({
            behaviour: 'smooth',
            top: position
        });
     const originalStyle = window.getComputedStyle(document.body).overflow;  
     document.body.style.overflow = 'hidden';
     return () => document.body.style.overflow = originalStyle;
     }, []); 
  };

  export default useBodyLock;