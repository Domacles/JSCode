/**
 * checkMessage keys.
 */

var msAlgorithm = require('../msutils/msalgorithm');

/**
 * checkMessage keys.
 * @param secretModel {SecretModel} defined in msutils/context.js
 * @param {Message} 
 * @param cipherText {string} cipherText in Message from socket client.
 * @return {boolean} cipherText in message is correct or not.
 */
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