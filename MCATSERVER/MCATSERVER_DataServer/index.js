/**
    This is a module for dealing request of dataSource. 
    I want to use **Redis** and **MySQL** to build this module.
 
    This module need implement those aspects:
        1. Create a socket server to return data for client.
        2. Authenticate whether the client of request has correct keys and timestamp.
        3. Response the data according to the operation type of request.
 */

var authentication = require('./src/authentication');
var dataSource = require('./src/dataSource');
var msconfig = require('./src/msconfig');
var ioredis = require('ioredis');
var net = require('net');

let sockets = {};
let context = msconfig.init('msconfig.json');
let redis = new ioredis(context.Redis.port, context.Redis.name);
let server = net.createServer((socket) => {
    socket.on('connect', () => { clientConnectHandler(socket); });
    console.log('add listener for connect_event of socket');

    socket.on('data', (data) => { clientDataHandler(socket, data); });
    console.log('add listener for data_event of socket');

    socket.on('end', () => { clientEndHandler(socket); });
    console.log('add listener for close_event of socket');

    socket.on('close', (data) => { clientCloseHandler(socket, data); });
    console.log('add listener for close_event of socket');

    socket.on('error', (error) => { clientErrorHandler(socket, error); });
    console.log('add listener for error_event of socket');
});

// main function
(function () {
    server.listen(context.HOST.port, context.HOST.name);
    server.on('error', (error) => {
        console.log('server has error when it run...');
        console.log(error);//deal error use myself
    });

    console.log('server start listening at PORT ' + context.HOST.port + ' on ' + context.HOST.name + '...');
})();


// those function used into socket callback.

function socketNameHandler(socket) {
    let address = socket.address();
    let socketName = '';
    for (let x in address) {
        if (socketName === '') socketName = address[x];
        else socketName = socketName + ' ' + address[x];
    }
    return socketName;
}

function clientConnectHandler(socket) {
    let message = Buffer.alloc(0);
    let socketName = socketNameHandler(socket);
    sockets[socketName] = message;
}

function clientDataHandler(socket, data) {
    let socketName = socketNameHandler(socket);
    let message = sockets[socketName];
    message = Buffer.concat([message, data], message.length + data.length);
    sockets[socketName] = message;
}

function clientEndHandler(socket) {
    let socketName = socketNameHandler(socket);
    let message = sockets[socketName];
    let res = Buffer.alloc(0);
    if (authentication.checkMessage(context.SecretModel, message.KeyMessage) == true) {
        let operation = message.Operation;
        res = Buffer.from(dataSource.handler(redis, operation));
    } else{
        res = Buffer.from('authentication failed!!!');
    }
    socket.end(res);
    delete sockets[socketName];
}

function clientCloseHandler(socket, data) {
    let socketName = socketNameHandler(socket);
    let message = '' + sockets[socketName] + data;
    if (message.length <= 100)
        console.log(message);
    delete sockets[socketName];
}

function clientErrorHandler(socket, error) {
    console.log('ERR : ' + socketNameHandler(socket));
    console.log(error);//deal error use myself
}