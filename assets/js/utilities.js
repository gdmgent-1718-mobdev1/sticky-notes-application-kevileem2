function formatDate(value) {
    if (value != null) {
        let date = new Date(value);
        var dateString = date.getDate() + "/"
        + checkDate((date.getMonth()+1))  + "/" 
        + date.getFullYear() + " @ "  
        + checkDate(date.getHours()) + ":"  
        + checkDate(date.getMinutes()) + ":" 
        + checkDate(date.getSeconds());
        return dateString;
    }
    else return "-";
}

function checkDate(value) {
    if (value < 10) {
        newValue = "0" + value;
        return newValue; 
    } else return value;
}