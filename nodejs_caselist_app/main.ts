import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

class Application {
    window: BrowserWindow;
    constructor() {
        this.run();
    }

    createWindow() {
        this.window = new BrowserWindow({ width: 800, height: 600 });
        this.window.loadURL(url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }

    run() {
        app.on('ready', this.createWindow);
    }
}

let m_app = new Application;