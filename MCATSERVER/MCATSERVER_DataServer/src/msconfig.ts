/**
 * Create a context with msconfig.json.
 */
import * as fs from 'fs';
import * as msconfig from '../msutils/msconfig';
/**
 * Create a context with msconfig.json.
 * @param fileName {string} the path of msconfig.json.
 * @return {Context} defined in msutils/context.js
 */
export function init(fileName: string): msconfig.MsConfig{
    let res: msconfig.MsConfig = null;
    let config: string = '';
    if (fileName.indexOf('msconfig.json') == -1) {
        console.log('msconfig.json not found...');
        return res;
    }
    try {
        config = fs.readFileSync(fileName, 'utf-8');
        res = JSON.parse(config);
    } catch (e) {
        console.log('read ' + fileName + ' error...');
        return res;
    }
    return res;
}