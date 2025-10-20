const { BrowserWindow, ipcMain, shell} = require('electron')
const { createMomentWindow, createMiniProgramWindow} = require('./windows')

// 注册窗口的控制时间
function registerWindowControlEvents() {

    // 窗口最小化
    ipcMain.on('window-minimize', (event) => {
        const win = BrowserWindow.fromWebContents(event.sender)
        win.minimize()
    })

    // 窗口最大化
    ipcMain.on('window-maximize', (event) => {
        const win = BrowserWindow.fromWebContents(event.sender)
        win.maximize()
    })

    // 取消最大化
    ipcMain.on('unmaximize', (event) => {
        const win = BrowserWindow.fromWebContents(event.sender)
        win.unmaximize()
    })

    // 判断是否最大化
    ipcMain.handle('is-window-maximized', (event) => {
        const win = BrowserWindow.fromWebContents(event.sender)
        return win.isMaximized()
    })

    // 关闭窗口
    ipcMain.on('window-close', (event) => {
        const win = BrowserWindow.fromWebContents(event.sender)
        win.close()
    })

    // 移动窗口API
    ipcMain.on('drag-window', (event, { dx, dy }) => {
        const win = BrowserWindow.fromWebContents(event.sender)
        if (win) {
            const [x, y] = win.getPosition()
            win.setPosition(x + dx, y + dy)
        }
    })

    // 创建朋友圈窗口
    ipcMain.on('open-moment-window', () => {
        createMomentWindow()
    })

    // 创建小程序窗口
    ipcMain.on('open-mini-program-window', () => {
        createMiniProgramWindow()
    })

    ipcMain.on('open-folder', (event, folderPath) => {
        shell.openPath(folderPath);
    })
}

module.exports = {
    registerWindowControlEvents
}
