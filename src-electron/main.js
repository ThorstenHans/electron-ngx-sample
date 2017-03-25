const { app, BrowserWindow, globalShortcut, Menu } = require('electron');
const path = require('path');
const url = require('url');
const menuBuilder = require('./menu-builder');

let win;
let createWindow = () => {
    win = new BrowserWindow({
        width: 1000,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        center: true,
        fullscreenable: true
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, '/web/index.html'),
        protocol: 'file:',
        slashes: true
    }));
    menuBuilder.buildMenu();
    globalShortcut.register('CmdOrCtrl+Shift+D', () => {
        win.webContents.toggleDevTools();
    });

    win.on('closed', () => {
        win = null;
    });
};


app.on('ready', createWindow);

app.on('window-all-closed', () => {
    globalShortcut.unregisterAll();
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
