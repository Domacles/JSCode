/**
 * Used moudle : nodeunit
 * ref : https://github.com/caolan/nodeunit
 * TODO
 */
var authentication = require('../src/authentication');
exports.setUp = (callback) => {
    let timeStamp = new Date().getTime();
    this.SecretModel = { type: 'function1', keys: '1234567890' };
    this.message = { name: '127.0.0.1', ports: '8888', timestamp: timeStamp };
    this.cipherText = '' + this.SecretModel.keys;
    for (let x in this.message) {
        this.cipherText = this.cipherText + this.message[x];
    }
    callback();
};
exports.tearDown = (callback) => {
    callback();
};
exports.test1 = (test) => {
    let res = authentication.checkMessage(this.SecretModel, this.message, this.cipherText);
    test.equal(res, true, ['res != cipherText']);
    test.done();
};
//# sourceMappingURL=test_authentication.js.map