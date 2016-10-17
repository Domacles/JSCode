/**
 *  Keys calculation algoritm.
 */

/**
 * Type 1.
 * @param keys {string} a keys string.
 * @param message {Message.Info}
 * @param {string} a cipherText string.
 */
exports.function1 = (keys, message) => {
    let res = '' + keys;
    for (let x in message) {
        res = res + message[x];
    }
    return res;
}