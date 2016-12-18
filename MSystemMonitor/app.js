"use strict";
require("source-map-support/register");
//module
const electron = require("electron");
const child_process = require("child_process");
//function & class
const exec = child_process.exec;
const BrowserWindow = electron.BrowserWindow;
//var & let
let cmd = process.platform == 'win32' ? 'tasklist' : 'ps aux';
//custom function & class
class Application {
}
;
//main_script
//# sourceMappingURL=app.js.map