
const generateAmendFormConfig = (data) =>{
    const tempObj = {};

    data.forEach((x, i)=>{
        tempObj[i] ={
            elementtype: 'input',
            elementConfig: {
                type: 'number',
                placeholder: `Game ${i+1}`,
                min: 0,
                max: 300
            },
            value: x.values[0],
            validation: {},
            touched: false,
            isValid: true,
            shouldValidate: false,
            hasErr: []
            }

    })

    return tempObj;
}

export default generateAmendFormConfig;