const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    minimize: () => ipcRenderer.send('window-minimize'),
    maximize: () => ipcRenderer.send('window-maximize'),
    unmaximize: () => ipcRenderer.send('unmaximize'),
    isWindowMaximized: () => ipcRenderer.invoke('is-window-maximized'),
    close: () => ipcRenderer.send('window-close'),
    dragWindow: (dx, dy) => ipcRenderer.send('drag-window', { dx, dy }),
    openMomentWindow: () => ipcRenderer.send('open-moment-window'),
    openMiniProgramWindow: () => ipcRenderer.send('open-mini-program-window'),
    openFolder: ( folderPath ) => ipcRenderer.send('open-folder', folderPath),
})
