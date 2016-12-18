import 'source-map-support/register';
//module
import * as electron from 'electron';
import * as fs from 'fs';
import * as child_process from 'child_process';
//function & class
const exec: typeof child_process.exec = child_process.exec;
//var & let
let cmd: String = process.platform == 'win32' ? 'tasklist' : 'ps aux';
//custom function & class

//main_script
