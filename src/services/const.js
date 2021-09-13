export const iterateObject = (obj, separate) => {
    let keys = [];
    let values = [];
    for (const [key, value] of Object.entries(obj)) {
        keys = [...keys, key];
        values = [...values, value];
    }
    if (separate) {
        return Object.entries(obj)
    }
    return { 
        keys: keys,
        values: values 
    }
}

export const formatString = (str) => {

    let capitalLettersIndexes = [];
    let strArray = str.split('');
    let incr = -1;

    for (var i = 0; i < strArray.length; i++) {

        if (str[i] === str[i].toUpperCase() && i !== 0) {
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