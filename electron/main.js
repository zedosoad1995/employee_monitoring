const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
const url = require('url')
const path = require('path')
const server = require('../backend/dist/src/bin/www')

const { hello } = require('./build/Release/addon')

let win

function createWindow() {
    console.log(hello())

    win = new BrowserWindow({
        width: 800, height: 600
    })
    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, './frontend/build/index.html')}`
    )

    if (isDev) {
        win.webContents.openDevTools({ mode: 'detach' })
    }
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})