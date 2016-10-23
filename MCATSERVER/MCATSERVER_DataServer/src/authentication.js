"use strict";
const msAlgorithm = require('../msutils/msalgorithm');
/**
 * This is a function for check client's infomation.
 * @param {Security} security
 * @param {Infomation} info
 * @return {boolean}
 */
function transToMessage(message) {
    let res = JSON.parse(message);
    return res;
}
exports.transToMessage = transToMessage;
function checkMessage(security, info) {
    let timestamp = new Date().getTime();
    if (timestamp - parseInt(info.timestamp) > 3000)
        return false;
    let res = (msAlgorithm[security.type])(security.keys, info);
    if (info.keyMessage === res)
        return true;
    else
        return false;
}
exports.checkMessage = checkMessage;
//# sourceMappingURL=authentication.js.map