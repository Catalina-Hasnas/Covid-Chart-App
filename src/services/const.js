export const iterateObject = (obj) => {
    if (obj){
        let keys = [];
        let values = [];
        for (const [key, value] of Object.entries(obj)) {
            keys = [...keys, key];
            values = [...values, value];
        }
        return { 
            keys: keys,
            values: values 
        }
    }
}

// formats a string of type: "NewCasesToday" in "New Cases Today"

export const formatString = (str) => {

    let capitalLettersIndexes = [];
    let strArray = str.split('');
    let incr = -1;

    for (var i = 0; i < strArray.length; i++) {

        if (i !== 0 && str[i] === str[i].toUpperCase()) {
            capitalLettersIndexes = [...capitalLettersIndexes, i];
        }
    }

    for (var j = 0; j < capitalLettersIndexes.length; j++) {
        incr++
        strArray.splice(capitalLettersIndexes[j]+incr, 0, ' ' )
    }

    return strArray.join('')
}

export const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number)
}

export const formatDate = (date) => {
    var options = { month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString("en-US", options);
}