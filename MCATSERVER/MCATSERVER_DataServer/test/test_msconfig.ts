/**
 * Used moudle : nodeunit
 * ref : https://github.com/caolan/nodeunit
 */

import * as msconfig from '../src/msconfig';

exports.setUp = (callback) => {
    this.fileName = '../msconfig.json';
    this.context = {
        Host: { name: '127.0.0.1', port: 6666 },
        Redis: { name: '127.0.0.1', port: 3879 },
        SecretModel: { type: 'function1', keys: '1234567890' }
    };
    callback();
}

exports.tearDown = (callback) => {
    callback();
}

exports.test1 = (test) => {
    let context = msconfig.init(this.fileName);
    test.notEqual(context, this.context, ['context is not null']);
    test.done();
};
