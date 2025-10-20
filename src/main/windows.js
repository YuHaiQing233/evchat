const path = require('path')
const { BrowserWindow, screen } = require('electron')
const waitOn = require('wait-on')

// 创建朋友圈窗口
function createMomentWindow() {

    const win = new BrowserWindow({
        width: 600,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    })

    // 移除窗口的菜单
    win.removeMenu()

    win.loadURL('http://localhost:5173/#/moment')
}

// 创建小程序窗口
function createMiniProgramWindow() {

    const win = new BrowserWindow({
        width: 600,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    })

    // 移除窗口的菜单
    win.removeMenu()

    win.loadURL('http://localhost:5173/#/mini-program')
}

// 创建主窗口
function createHomeWindow () {

    const { width, height} = screen.getPrimaryDisplay().workAreaSize
    const win = new BrowserWindow({
        width: 800,
        minWidth: 800,
        maxWidth: width,
        height: 600,
        minHeight: 600,
        maxHeight: height,
        frame: false,
        useContentSize: true,
        webPreferences: {
            preload: path.join(__dirname, '../preload/preload.js')
        }
    })

    // 移除窗口的菜单
    win.removeMenu()

    // 打开调试工具
    // win.webContents.openDevTools()

    // 加载窗口
    if (process.env.NODE_ENV === 'development') {

        waitOn({ resources: ['http://localhost:5173']}, (err) => {
            if (err) {
                console.error('Vite dev server not ready:', err);
                return;
            }
            win.loadURL('http://localhost:5173')
        })

    } else {
        win.loadFile(path.join(__dirname, '../../out/index.html'))
    }

}

module.exports = {
    createHomeWindow,
    createMomentWindow,
    createMiniProgramWindow
}
