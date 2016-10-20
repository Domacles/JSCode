/**
 *  Keys calculation algoritm.
 */

/**
* Type 1.
* @param keys {string} a keys string.
* @param message {Message.Info}
* @param {string} a cipherText string.
*/
export function function1(keys: string, message: any): string {
    let res: string = keys;
    for (let x in message) {
        if(message[x] == keys) continue;
        res = res + message[x];
    }
    return res;
}