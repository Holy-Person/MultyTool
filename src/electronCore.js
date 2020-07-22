// Call in all required modules.
const { app, BrowserWindow, Menu, ipcMain, globalShortcut } = require('electron');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// This keeps a global reference of the window object
let mainWindow;

const createWindow = () => {
  // Creating the browser window
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

  // Loading the main menu.
  mainWindow.loadURL(`file://${__dirname}/menu.html`);
  
  //Remove default menu bar.
  Menu.setApplicationMenu(null);

  // Gets emitted when the window closes.
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  
  globalShortcut.register('ctrl+shift+x', function () {
    mainWindow.webContents.toggleDevTools();
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  app.allowRendererProcessReuse = false;
  createWindow();
});

// Quits once all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Recreates window in the app when the dock icon is clicked and there are no other windows open. (On OS X)
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

//Transportation between windows
ipcMain.on('changePage', (event, destination) => { //this is a placeholder, gonna change it once the module reader is finished
  if(destination != "menu") {
    mainWindow.loadURL(`file://${__dirname}/Modules/${destination}/index.html`);
  } else {
    mainWindow.loadURL(`file://${__dirname}/${destination}.html`);
  }
});