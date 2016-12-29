//module
import * as fs from 'fs';
import * as electron from 'electron';
import * as child_process from 'child_process';
//function & class
const exec: typeof child_process.exec = child_process.exec;
const BrowserWindow: typeof electron.BrowserWindow = electron.BrowserWindow;
//var & let
//custom function & class
class Application {
    private app: Electron.App;
    private mainWindow: Electron.BrowserWindow;

    protected createWindow() {
        if (this.mainWindow === null)
            this.mainWindow = new BrowserWindow({ width: 800, height: 600 });
        this.mainWindow.setTitle('MSystemMonitor');
        this.mainWindow.loadURL(`file://${__dirname}/static/app.html`);
        this.mainWindow.on('closed', () => {
            this.mainWindow = null;
        });
    }

    protected appQuit() {
        if (process.platform !== 'darwin')
            this.app.quit();
    }

    protected appActivate() {
        if (this.mainWindow === null)
            this.createWindow();
    }

    constructor(app = electron.app) {
        this.app = app;
        this.mainWindow = null;
    }

    run() {
        let cmd: String = process.platform == 'win32' ? 'tasklist' : 'ps aux';
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
};
//main_script
let mainAppLication = new Application();
mainAppLication.run();