const { app, BrowserWindow, Menu, ipcMain, globalShortcut } = require('electron');
const path = require('path');
const { format } = require('url');

const isDevelopment = process.env.NODE_ENV !== 'production';

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1200, height: 700,
    minWidth: 700, minHeight: 500,
    frame: true,
    resizable: true, closable: true,
    center: true,
    webPreferences: {
        nodeIntegration: true,
        devTools: true,
        enableRemoteModule: false //Going to deprecate in later versions of electron anyway.
    },
    icon: __dirname + '/AppData/Icons/NaN.ico'
  });

  mainWindow.loadURL(format({
    pathname: path.join(__dirname, 'menu.html'),
    protocol: 'file',
    slashes: true
  }))
  
  Menu.setApplicationMenu(null);

  // Gets emitted when the window closes.
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  
  mainWindow.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    require('electron').shell.openExternal(url);
  });
  
  globalShortcut.register('ctrl+shift+i', function () {
    mainWindow.webContents.toggleDevTools();
  });

  return mainWindow
}

// Quits once all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Recreates window in the app when the dock icon is clicked and there are no other windows open. (On OS X)
app.on('activate', () => {
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', () => {
  mainWindow = createMainWindow();
})

//Transportation between windows
ipcMain.on('changePage', (event, destination) => {
  if(destination != "menu") {
    mainWindow.loadURL(format({
      pathname: path.join(__dirname, `/Modules/${destination}/index.html`),
      protocol: 'file',
      slashes: true
    }))
  } else {
    mainWindow.loadURL(format({
      pathname: path.join(__dirname, 'menu.html'),
      protocol: 'file',
      slashes: true
    }))
  }
});
