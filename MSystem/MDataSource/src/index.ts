/**
 * This is a index source file.
 */

// DataSource Interface
interface Master {
    host: string,
    port: number,
    password: string
}

/***********************************************************************************************/

import * as fs from 'fs';
import * as net from 'net';
import * as Redis from 'ioredis';
import * as Collection from 'lodash';

// Variate List
let master: Master = JSON.parse(fs.readFileSync('config.json', 'utf-8'));
let redis: IORedis.Redis = new Redis(master.port, master.host, { password: master.password });
let server: net.Server = net.createServer((socket: net.Socket) => {
    
});
// Function List

//Main Function
(function () {

})();
