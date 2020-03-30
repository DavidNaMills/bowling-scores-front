
const generateDate = (date, loc) =>{
    const c = Date.parse(date);
    const s = new Date(c)
    return s.toLocaleDateString('en-CH', {
        day: 'numeric', month: 'short', year: 'numeric'
      }).replace(/ /g, '-');
    
}

export default generateDate;