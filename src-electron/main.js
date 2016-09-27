const { app, BrowserWindow, globalShortcut } = require('electron');

let win;

function createWindow() {
    win = new BrowserWindow({ width: 800, height: 600 });
    win.loadURL(`file://${__dirname}/renderer/index.html`);
    globalShortcut.register('CmdOrCtrl+Shift+D', ()=>{
        win.webContents.toggleDevTools();
    });
    win.on('closed', () => {
        win = null;
    });
}
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
