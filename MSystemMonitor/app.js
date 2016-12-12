"use strict";
require("source-map-support/register");
//module
const electron = require("electron");
//variate
let app = electron.app;
let mainWindow = null;
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
function createWindow() {
    mainWindow = new electron.BrowserWindow({ width: 800, height: 600 });
    mainWindow.loadURL(`file://${__dirname}/app.html`);
    //mainWindow.webContents.openDevTools();
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}
//# sourceMappingURL=app.js.map