const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;


electron.crashReporter.start();
var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 960, height: 700});
  mainWindow.loadURL('file://' + __dirname + '/frontend/index.html');
 
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});