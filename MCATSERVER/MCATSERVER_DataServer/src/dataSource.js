/**
 *  TODO
 */

var msRedisOperation = {
}

exports.handlerhandler = (redis, operation) => {
    let res = '';
    let type = operation.type;
    let targ = operation.target;
    let data = operation.data;
    res = (msRedisOperation[type])(targ, data);
    return res;
}
