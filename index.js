
const url= require('url');
const path= require('path');
const electron=  require('electron');

const {app, ipcMain, BrowserWindow}= electron;


/**
 * Main window instance
 */
let mainWindow;


/**
 * Create and initialize the main window
 */
const initMainWindow= () => {

	mainWindow= new BrowserWindow({
		width: 800,
		height: 600,
		frame: false,
		transparent: true,
		titleBarStyle: 'hidden',
	});

	// mainWindow.maximize();

	mainWindow.webContents.openDevTools();

	mainWindow.loadURL(url.format({
		pathname: path.resolve('html', 'index.html'),
		protocol: 'file:',
		slashes: true,
	}));

	mainWindow.on('closed', () => {
		mainWindow= null;
	});
};


ipcMain.on('close-main-window', () => {

	if(mainWindow)
		mainWindow.close();

	mainWindow= null;
});



app
	.on('ready', initMainWindow)
	.on('window-all-closed', () => {
		if (process.platform !== 'darwin')
			app.quit();
	})
	.on('activate', () => {
		if (mainWindow === null)
			initMainWindow();
	});
