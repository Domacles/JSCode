/**
* Description:
*   This is the main.js for sever.
**/

//This is the modules for this sever.
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');

//Those are the objects when the sever run.
var sever = null;
var cache = {};

/**
* Description:
*   This is a function for send 404.
*   @param : res    => res
*   @return: null   => null
**/
function severSendState404(res){
    res.writeHead(
        404,
        {
            'Content-Type': 'text/plain'
        }
    );
    res.write('Error 404: resource not found.');
    res.end();
}

/**
* Description:
*   This is a function for add contents into response.
*   @param : res            => response
*   @param : filePath       => filePath
*   @param : fileContents   => fileContents
*   @return: null           => null
**/
function sendFileFromMemory(res, filePath, fileContents){
    res.writeHead(
        200,
        {
            "content-type": mime.lookup(path.basename(filePath))
        }
    );
    res.end(fileContents);
}

/**
* Description:
*   This is a function for send a static file , like *.html.
*   @param : res        => res
*   @param : cache      => cache
*   @param : absPath    => absPath
*   @return: null       => null
**/
function severSendStaticFiles(res, cache, absPath){
    if(cache[absPath]) sendFileFromMemory(res, absPath, cache[absPath]);
    else{
        fs.exists(absPath, (exists) =>{
            if(exists){
                fs.readFile(absPath, (err, data) =>{
                    if(err) severSendState404(res);
                    else{
                        cache[absPath] = data;
                        sendFileFromMemory(res, absPath, data);
                    }
                });
            }else severSendState404(res);
        });
    }
}

/**
* Description:
*   This is a function for create httpSever.
*   @param : function   => function
*   @return: null       => null
**/
(sever = http.createServer((req, res) =>{
    
    var filePath = false;
    
    if(req.url == '/') filePath = 'public/index.html';
    else filePath = 'public' + req.url;

    var absPth = './' + filePath;

    severSendStaticFiles(res, cache, absPth);

})).listen(3000, () =>{
    console.log("Sever listening on port 3000...");
});







