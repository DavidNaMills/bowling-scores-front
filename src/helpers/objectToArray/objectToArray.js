
const objectToArray = (obj) => {
    const formElementsArray = [];
    for (let key in obj) {
        let full = {
            id: key,
            config: obj[key]
        }

        formElementsArray.push(full);
    }
    return formElementsArray;
}

export default objectToArray;