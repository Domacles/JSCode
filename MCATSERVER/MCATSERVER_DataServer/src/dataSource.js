/**
 *  TODO
 */

var msRedisOperation = {
}

/**
 * DataSource handler functions.
 * @param redis {Redis} redis class from 'ioredis' moudle.
 * @param operation {Operation}
 * @return {string|boolean} if res is a integer, should to
 */
exports.handlerhandler = (redis, operation) => {
    let res = '';
    let type = operation.type;
    let targ = operation.target;
    let data = operation.data;
    res = (msRedisOperation[type])(targ, data);
    return res;
}
