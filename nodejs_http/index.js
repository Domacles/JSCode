var http = require('http');

var server = http.createServer(function(req, res){
    var body = 'asdasd';
    res.setHeader('Content-Length', body.length);
    res.setHeader('Content-Type', 'text/plain');
    res.write(body);
    res.end();
});

(function(){
    server.listen(3000, function(){
        console.log("http server is listening on port 3000...");
    });
})();