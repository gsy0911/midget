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
	onChangeWorkingAt: (): Promise<number> => {
		return new Promise(resolve => {
			ipcRenderer.on("workingAt", (_, args) => {
				resolve(args.name)
			})
		})
	},
});
