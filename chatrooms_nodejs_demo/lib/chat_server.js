var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = {};
var currentRoom = {};

exports.listen = function (server) {
    io = socketio.listen(server);

    io.set('log level', 1);
    io.sockets.on('connection', (socket) => {
        guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
        joinRoom(socket, 'Lobby');
        handleMessageBroadcasting(socket, nickNames);
        handleNameChangeAttempts(socket, nickNames, namesUsed);
        handleRoomJoining(socket);
        socket.on('rooms', () => {
            socket.emit('rooms', io.sockets.manager.rooms);
        });
        handleClientDisconnection(socket, nickNames, namesUsed);
    });
}

function assignGuestName(socket, guestNumber, nickNames, namesUsed) {

}

function joinRoom(socket, room) {

}

function handleMessageBroadcasting(socket, nickNames) {

}

function handleNameChangeAttempts(socket, nickNames, namesUsed) {

}

function handleRoomJoining(socket) {

}

function handleClientDisconnection(socket, nickNames, namesUsed) {

}