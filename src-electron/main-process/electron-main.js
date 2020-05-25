import { app, BrowserWindow, ipcMain, Menu, nativeTheme } from 'electron';
import { menuTemplate } from './electron-menu-template';

const path = require('path');

try {
  if (
    process.platform === 'win32' &&
    nativeTheme.shouldUseDarkColors === false
  ) {
    require('fs').unlinkSync(
      require('path').join(app.getPath('userData'), 'DevTools Extensions')
    );
  }
}
catch (_) {
}

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if ( process.env.PROD ) {
  global.__statics = require('path')
    .join(__dirname, 'statics')
    .replace(/\\/g, '\\\\');
}

/*
variables and constants
*/

export let mainWindow;
const menu = Menu.buildFromTemplate(menuTemplate);
/*
 app ready
 */

app.on('ready', () => {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    minWidth: 800,
    minHeight: 500,
    useContentSize: true,
    webPreferences: {
      // Change from /quasar.conf.js > electron > nodeIntegration;
      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: QUASAR_NODE_INTEGRATION,
      nodeIntegrationInWorker: QUASAR_NODE_INTEGRATION,

      //use preload to access ipcRenderer in App.vue
      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, 'electron-preload.js'),
    },
  });

  // mainWindow.loadURL(`file://${path.join(__dirname, 'index.html')}`);
  mainWindow.loadURL(process.env.APP_URL);
  // console.log('AppURL: ', process.env.APP_URL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  Menu.setApplicationMenu(menu);
});

/*
App events
 */
app.on('window-all-closed', () => {
  app.quit();
});

/*
IPC events
 */
ipcMain.on('quit-app', () => {
  app.quit();
});
