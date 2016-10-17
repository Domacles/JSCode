/**
 * 
 */

var fs = require('fs');

exports.init = (fileName) => {

    let res = null;
    let config = '';

    if(fileName.indexOf('msconfig.json') == -1){
        console.log('msconfig.json not found...');
        return res;
    }

    try{
        config = fs.readFileSync(fileName, 'utf-8');
        res = JSON.parse(config);    
    }catch(e){
        console.log('read ' + fileName + ' error...');
        return res;
    }
    
    return res;
}