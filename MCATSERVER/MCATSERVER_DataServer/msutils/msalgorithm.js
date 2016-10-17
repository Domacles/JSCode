/**
 * 
 */

exports.function1 = (keys, message) => {
    let res = '' + keys;
    for (let x in message) {
        res = res + message[x];
    }
    return res;
}