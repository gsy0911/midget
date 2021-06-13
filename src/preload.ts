import {contextBridge, ipcRenderer} from "electron";

contextBridge.exposeInMainWorld("core", {
	loadConfig: () => {
		ipcRenderer.invoke('loadConfig')
	}
});
