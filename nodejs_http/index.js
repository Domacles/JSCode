var socketio = require('socket.io');
var net = require('net');

var server = net.createServer(function(socket){
    socket.on('data', function(){
        socket.write(data);
    });
});


(function(){
    server.listen(8888);
})();