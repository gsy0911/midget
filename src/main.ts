import {app, BrowserWindow, globalShortcut, Notification, ipcMain} from "electron";
import {TrayMenu} from "./TrayMenu";
import path from "path";

import fs from "fs-extra";
import {IContextBridge} from "./states/IContextBridge";
import {IConfig, defaultConfig} from './states';
import os from "os";

let tray = null;

// macOS
const isMacOs = process.platform === 'darwin'
if (isMacOs) {
	// Dockを非表示にする
	app.dock.hide()
}


const createWindow = () => {
	const win = new BrowserWindow({
		width: 300,
		height: 300,
		transparent: true,
		webPreferences: {
			// not to use `Node.js` in `renderer process`
			nodeIntegration: false,
			nodeIntegrationInWorker: false,
			contextIsolation: true,
			preload: path.join(app.getAppPath(), "preload.js"),
			webSecurity: false,
		},
		frame: false,
		alwaysOnTop: true,
	});
	win.setAlwaysOnTop(true, "screen-saver")
	win.setVisibleOnAllWorkspaces(true)

	void win.loadFile(path.join(app.getAppPath(), "index.html"));
	if (process.argv.find((arg) => arg === "--debug")) {
		win.webContents.openDevTools();
	}
	tray = new TrayMenu(win);
};

void app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

app.on("ready", function () {
	globalShortcut.register("alt+space", function () {
		// get focused window
		const window = BrowserWindow.getFocusedWindow();
		// window shown or not
		window ? hideWindow(window) : showWindow();
	});

	const notification = new Notification({
		title: "ne10",
		body: "neon !",
	});
	notification.show();
});

app.on("will-quit", () => {
	// remove all registered shortcut
	globalShortcut.unregisterAll();
});

function showWindow() {
	// detect blur event of BrowserWindow
	app.focus({steal: true});
	app.show();
}

function hideWindow(window: BrowserWindow) {
	// window is shown in center
	app.hide();
}

// ========
// ipcMain
// ========

const configFilePath = path.join(os.homedir(), "ne10_config.json");

const loadConfig = async (): Promise<IConfig> => {
	const exist = await fs.pathExists(configFilePath);
	console.log(`config exists? : ${exist}`)

	if (!exist) {
		fs.ensureFileSync(configFilePath);
		await fs.writeJSON(configFilePath, {data: defaultConfig});
	}

	const jsonData = (await fs.readJSON(configFilePath)) as { data: IConfig };
	return jsonData.data;
};

ipcMain.handle('loadConfig', loadConfig)
