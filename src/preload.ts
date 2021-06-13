import {contextBridge, ipcRenderer} from "electron";

contextBridge.exposeInMainWorld("contextBridge", {
	loadConfig: () => {
		ipcRenderer.invoke('loadConfig').then(data => data).catch(err => console.log(err))
	}
});
