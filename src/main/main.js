
const { app, BrowserWindow  } = require('electron')
const { createHomeWindow } = require('./windows')
const { registerWindowControlEvents } = require('./events')


app.whenReady().then(() => {

    // 创建主窗口
    createHomeWindow()

    // 注册窗口控制事件
    registerWindowControlEvents()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})


