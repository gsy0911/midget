import {app, BrowserWindow, globalShortcut, Notification} from "electron";
import {TrayMenu} from "./TrayMenu";
import path from "path";

let tray = null;

// macOS
const isMacOs = process.platform === 'darwin'
if (isMacOs) {
	// Dockを非表示にする
	app.dock.hide()
}


const createWindow = () => {
	const win = new BrowserWindow({
		width: 400,
		height: 400,
		transparent: true,
		webPreferences: {
			// not to use `Node.js` in `renderer process`
			nodeIntegration: false,
			nodeIntegrationInWorker: false,
			contextIsolation: true,
			preload: path.join(__dirname, "./core/preLoad.js"),
			webSecurity: false,
		},
		frame: false,
		alwaysOnTop: true,
	});
	win.setAlwaysOnTop(true, "screen-saver")
	win.setVisibleOnAllWorkspaces(true)

	void win.loadFile(path.join(__dirname, "./index.html"));
	if (process.argv.find((arg) => arg === "--debug")) {
		win.webContents.openDevTools();
	}
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

	tray = new TrayMenu();
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
	window.center();
	app.hide();
}