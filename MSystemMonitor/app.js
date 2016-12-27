"use strict";
require("source-map-support/register");
const electron = require("electron");
const child_process = require("child_process");
//function & class
const exec = child_process.exec;
const BrowserWindow = electron.BrowserWindow;
//var & let
//custom function & class
class Application {
    createWindow() {
        if (this.mainWindow === null)
            this.mainWindow = new BrowserWindow({ width: 800, height: 600 });
        this.mainWindow.setTitle('MSystemMonitor');
        this.mainWindow.loadURL(`file://${__dirname}/static/app.html`);
        this.mainWindow.on('closed', () => {
            this.mainWindow = null;
        });
    }
    appQuit() {
        if (process.platform !== 'darwin')
            this.app.quit();
    }
    appActivate() {
        if (this.mainWindow === null)
            this.createWindow();
    }
    constructor(app = electron.app) {
        this.app = app;
        this.mainWindow = null;
    }
    run() {
        let cmd = process.platform == 'win32' ? 'tasklist' : 'ps aux';
        this.app.on('ready', () => {
            this.createWindow();
        });
        this.app.on('window-all-closed', () => {
            this.appQuit();
        });
        this.app.on('activate', () => {
            this.appActivate();
        });
    }
}
;
//main_script
let mainAppLication = new Application();
mainAppLication.run();
//# sourceMappingURL=app.js.map