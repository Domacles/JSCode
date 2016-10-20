/**
 *  TODO
 */
import * as Redis from 'ioredis';
import {Operation} from '../msutils/message';

let msRedisOperation = {
}
/**
 * DataSource handler functions.
 * @param redis {Redis} redis class from 'ioredis' moudle.
 * @param operation {Operation}
 * @return {string|boolean} if res is a integer, should to
 */
export function handler(redis: IORedis.Redis, operation: Operation): string|boolean {
    let res : string|boolean = '';
    res = (msRedisOperation[operation.type])(operation);
    return res;
}
