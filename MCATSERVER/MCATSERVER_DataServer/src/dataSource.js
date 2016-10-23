"use strict";
let msRedisOperation = {};
/**
 * DataSource handler functions.
 * @param redis {Redis} redis class from 'ioredis' moudle.
 * @param operation {Operation}
 * @return {string|boolean} if res is a integer, should to
 */
function handler(redis, operation) {
    let res = '';
    res = (msRedisOperation[operation.type])(operation);
    return res;
}
exports.handler = handler;
//# sourceMappingURL=dataSource.js.map