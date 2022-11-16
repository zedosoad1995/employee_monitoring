const { app, BrowserWindow, dialog } = require('electron')
const isDev = require('electron-is-dev')
const url = require('url')
const path = require('path')
const server = require('./backend/src/bin/www')
const fs = require('fs')
const { PrismaClient, Prisma } = require("@prisma/client");

const { start, openTCPIP } = require('./build/Release/addon')

let win

async function createWindow() {
    /* start(function () {
        console.log("JavaScript callback called with arguments", Array.from(arguments));
    }, 500); */

    //process.env.DATABASE_URL = `file:${path.join(process.resourcePath, 'extraResources', 'dev.db')}`

    const c = openTCPIP("192.168.0.110", "3800")
    console.log(c)

    win = new BrowserWindow({
        width: 800, height: 600
    })
    win.loadURL(
        isDev
            ? `file://${__dirname}/frontend/index.html`
            : `file://${path.join(__dirname, './frontend/index.html')}`
    )

    if (isDev) {
        win.webContents.openDevTools({ mode: 'detach' })
    }
}

app.on('ready', createWindow)

app.on('browser-window-created', async () => {
    //process.env.DATABASE_URL = `file:${path.join(app.getPath('desktop'), 'dev.db')}`
    /* const messageBoxOptions = {
        type: "error",
        title: "Error in Main process",
        message: `file:${path.join(app.getPath('desktop'), 'dev.db')}`
    }; */

    /* const messageBoxOptions0 = {
        type: "error",
        title: "Error in Main process",
        message: JSON.stringify(Prisma.prismaVersion)
    };
    dialog.showMessageBoxSync(messageBoxOptions0); */


    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: `file:${path.join(app.getPath('desktop'), 'dev.db')}`,
            },
        },
    })
    const rar = await prisma.group.findMany()
    const messageBoxOptions = {
        type: "error",
        title: "Error in Main process",
        message: JSON.stringify(rar)
    };
    dialog.showMessageBoxSync(messageBoxOptions);
    //process.env.DATABASE_URL = `file:${path.join(process.resourcePath, 'extraResources', 'dev.db')}`

    /* dialog.showMessageBoxSync(messageBoxOptions);
    const res = fs.readFileSync(`${path.join(app.getPath('desktop'), 'aaa.txt')}`, 'utf8')
    console.log(res.toString()) */

    //process.env.DATABASE_URL = `file:${path.join(process.resourcePath, 'extraResources', 'dev.db')}`
})

app.on('window-all-closed', () => {
    /* const prisma = new PrismaClient({
        datasources: {
            db: {
                url: `file:${path.join(app.getPath('desktop'), 'dev.db')}`,
            },
        },
    })
    const lala = await prisma.group.findMany() */
    //process.env.DATABASE_URL = `file:${path.join(process.resourcePath, 'extraResources', 'dev.db')}`
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})