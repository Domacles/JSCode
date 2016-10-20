/**
 * checkMessage keys.
 */
import { Security } from '../msutils/msconfig';
import { Infomation, Message } from '../msutils/message';
import * as msAlgorithm from '../msutils/msalgorithm';
/**
 * This is a function for check client's infomation.
 * @param {Security} security
 * @param {Infomation} info 
 * @return {boolean}
 */

export function transToMessage(message: string): Message {
    let res = JSON.parse(message);
    return res;
}

export function checkMessage(security: Security, info: Infomation): boolean {
    let timestamp: number = new Date().getTime();
    if (timestamp - parseInt(info.timestamp) > 3000)
        return false;
    let res: string = (msAlgorithm[security.type])(security.keys, info);
    if (info.keyMessage === res)
        return true;
    else
        return false;
}