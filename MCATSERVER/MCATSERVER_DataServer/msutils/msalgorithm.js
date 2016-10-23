/**
 *  Keys calculation algoritm.
 */
"use strict";
/**
* Type 1.
* @param keys {string} a keys string.
* @param message {Message.Info}
* @param {string} a cipherText string.
*/
function function1(keys, message) {
    let res = keys;
    for (let x in message) {
        if (message[x] == keys)
            continue;
        res = res + message[x];
    }
    return res;
}
exports.function1 = function1;
