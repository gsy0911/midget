import {contextBridge, ipcRenderer} from "electron";

contextBridge.exposeInMainWorld("contextBridge", {
	loadConfig: () => ipcRenderer.invoke('loadConfig'),
	onLongTimeBreak: (): Promise<number> => {
		return new Promise(resolve => {
			ipcRenderer.on("longTimeBreak", (_, args) => {
				resolve(args.minutes)
			})
		})
	},
});
