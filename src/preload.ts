import {contextBridge, ipcRenderer} from "electron";

contextBridge.exposeInMainWorld("contextBridge", {
	loadConfig: () => ipcRenderer.invoke('loadConfig')
});
