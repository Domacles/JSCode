MCATSERVER_DataServer
===

This is a module for dealing request of dataSource.I want to use **Redis** and **MySQL** to build this module.

## Features

This module need implement those aspects:

1. Create a socket server to return data for client.
2. Authenticate whether the client of request has correct keys and timestamp.
3. Response the data according to the operation type of request.

## File Direction

```
[1]---------------------------
<DIR> typings
jsconfig.json
.eslintrc.json

[2]---------------------------
<DIR> node_modules
package.json

[3]---------------------------
<DIR> src
    authentication.js
    dataSource.js
    msconfig.js
<DIR> test
    test_authentication.js
    test_dataSource.js
    test_msconfig.js
<DIR> msutils
msconfig.json
index.js
```

1. `[1]` is configfiles and *.t.ds for VSCode.
2. `[2]` is npm package and its node_modules.
3. `[3]` is my srcfile: `src` has file for some class,`msutils` has file for common utils, `test` has file for unit_test of `src`,`index.js` is start_file. `msconfig.json` is configfiles for this app.

## Todo List

* `*.js` use typescript build.
* `dataSource.js` need add the function for different request.
* `msutils` need add into **git**.
* Add *ORM* dataSource used with **MySQL**.

## Did List

* Add this module into **git**.
* `message` in `index.js` need a rule for its datastructs, and add `message.json` into `untils`.