const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 960, height: 700, title:'Electron-TS-Angular2'});
  mainWindow.loadURL(`file://${__dirname}/frontend/index.html`);
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
