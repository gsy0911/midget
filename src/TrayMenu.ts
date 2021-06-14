import {app, BrowserWindow, Tray, Menu, nativeImage} from "electron";
import path from "path";

export class TrayMenu {
	// Create a variable to store our tray
	// Public: Make it accessible outside of the class;
	// Readonly: Value can't be changed
	public readonly tray: Tray;

	// Path where should we fetch our icon;
	private iconPath = path.join(__dirname + "/assets/icon.png");

	constructor(window: BrowserWindow) {
		this.tray = new Tray(this.createNativeImage());
		this.tray.setContextMenu(this.createContextMenu(window));
	}

	createNativeImage(): nativeImage {
		// Since we never know where the app is installed,
		// we need to add the app base path to it.
		const path = this.iconPath;
		const image = nativeImage.createFromPath(path);
		// Marks the image as a template image.
		image.setTemplateImage(true);
		return image;
	}

	createContextMenu(window: BrowserWindow): Menu {
		const contextMenu = Menu.buildFromTemplate([
			// {
			// 	label: "work timer",
			// 	type: "radio",
			// 	// click: () => window.loadURL("/"),
			// },
			// {
			// 	label: "none",
			// 	type: "radio",
			// 	// click: () => window.loadURL("/unknown")
			// },
			// {type: "separator"},
			{
				label: "reset",
				click: () => window.reload()
			},
			{
				label: "1 hour break",
				click: () => window.webContents.send("longTimeBreak", {hour: 1})
			},
			// {
			// 	label: "work timer",
			// 	submenu: [
			// 		{
			// 			label: "reset",
			// 			click: () => window.reload()
			// 		}
			// 	],
			// },
			{
				label: "Quit",
				accelerator: "Command+Q",
				click: function () {
					app.quit();
				},
			},
		]);
		return contextMenu;
	}
}
