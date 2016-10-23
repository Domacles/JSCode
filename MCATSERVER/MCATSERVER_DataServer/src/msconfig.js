"use strict";
/**
 * Create a context with msconfig.json.
 */
const fs = require('fs');
/**
 * Create a context with msconfig.json.
 * @param fileName {string} the path of msconfig.json.
 * @return {Context} defined in msutils/context.js
 */
function init(fileName) {
    let res = null;
    let config = '';
    if (fileName.indexOf('msconfig.json') == -1) {
        console.log('msconfig.json not found...');
        return res;
    }
    try {
        config = fs.readFileSync(fileName, 'utf-8');
        res = JSON.parse(config);
    }
    catch (e) {
        console.log('read ' + fileName + ' error...');
        return res;
    }
    return res;
}
exports.init = init;
//# sourceMappingURL=msconfig.js.map