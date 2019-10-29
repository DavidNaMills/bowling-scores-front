/*
    minimum length
    maximum length
    is email
    is required
*/

const formValidation = (data, config, field) =>{
    let isValid = true;
    let errorMsg = [];

    //TODO: minLength for strings, 
    // minValue for numbers

    const testSpecs = config[field].validation;

    for(let key in testSpecs){
        switch(key){               
            case 'minLength':
                if(data.length < testSpecs[key].req){
                    isValid = false;
                    errorMsg = errorMsg.concat(testSpecs[key].errMsg);
                }
                break;
            case 'maxLength':
                if(data.length > testSpecs[key].req){
                    isValid = false;
                    errorMsg = errorMsg.concat(testSpecs[key].errMsg);
                }
            break;

            case 'isSame':
                if(data !== config[testSpecs[key].field].value){
                    isValid = false;
                    errorMsg = errorMsg.concat(testSpecs[key].errMsg);
                }
                break;

            default:
                break;
        }
    }

    return {
        isValid,
        errorMsg
    };
}
export default formValidation;