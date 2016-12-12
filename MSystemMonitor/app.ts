import 'source-map-support/register';
//module
import * as electron from 'electron';
import * as fs from 'fs';
//variate
let app: Electron.App = electron.app;
let mainWindow: Electron.BrowserWindow = null;

//on 'ready'
app.on('ready', () => {
    createWindow();
});

//on 'activate'
app.on('activate', () => {
    if (mainWindow == null)
        createWindow();
});

//on 'window-all-closed'
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit();
});

/**
 * @func createWindow
 * @description This is a function for createWindow and adding on eventListener.
 */
function createWindow(): void {
    mainWindow = new electron.BrowserWindow({ width: 800, height: 600 });
    mainWindow.loadURL(`file://${__dirname}/app.html`);
    //mainWindow.webContents.openDevTools();
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}


