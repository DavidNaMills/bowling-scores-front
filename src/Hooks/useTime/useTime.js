
const useTime = () =>{
    //in milliseconds

    const getTime = () => {
         return new Date().getTime();        
    };

    const convertTime = (date) => {
        return `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}`;
    };

    return {
        getTime,
        convertTime
    }
}

export default useTime;