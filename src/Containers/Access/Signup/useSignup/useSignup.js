import {useRef} from 'react';


const useSignup = () =>{
    const thirdPartyRef = useRef(null);

    const googleSignup = (gooObj)=>{
        // console.log(gooObj);
    }

    const faceBookSignup = (fbObj) =>{
        // console.log(fbObj);
    }

    return {
        googleSignup,
        faceBookSignup
    }
}

export default useSignup;