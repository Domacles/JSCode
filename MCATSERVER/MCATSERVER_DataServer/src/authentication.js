/**
 * 
 */

var msAlgorithm = require('../msutils/msalgorithm');

exports.checkMessage = (secretModel, message, cipherText) => {

    let timestamp = new Date().getTime();
    if(timestamp - message.timestamp > 3000)
        return false;

    let res = (msAlgorithm[secretModel.type])(secretModel.keys, message);

    if(cipherText === res)
        return true;
    else
        return false;
}