import {app, BrowserWindow, Tray, Menu, nativeImage, MenuItemConstructorOptions} from "electron";
import path from "path";

export class TrayMenu {
	// Create a variable to store our tray
	// Public: Make it accessible outside of the class;
	// Readonly: Value can't be changed
	public readonly tray: Tray;

	// Path where should we fetch our icon;
	private iconPath = path.join(__dirname + "/assets/icon.png");

	constructor(window: BrowserWindow, workingAt: string[]) {
		this.tray = new Tray(this.createNativeImage());
		this.tray.setContextMenu(this.createContextMenu(window, workingAt));
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

	createContextMenu(window: BrowserWindow, workingAt: string[]): Menu {
		const addWorkingAtMenu = (label: string, checked: boolean): MenuItemConstructorOptions => {
			return {
				label: label,
				type: "radio",
				checked: checked,
				click: () => window.webContents.send("workingAt", {name: label})
			}
		}
		const workingAtSubmenu = workingAt.map((value, index) => {
			if (index === 0) {
				return addWorkingAtMenu(value, true)
			} else {
				return addWorkingAtMenu(value, false)
			}
		})
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
			{
				label: "reset",
				click: () => window.reload()
			},
			{type: "separator"},
			{
				label: "break",
				submenu: [
					{
						label: "1 hour",
						click: () => window.webContents.send("longTimeBreak", {minutes: 60})
					}
				],
			},
			{
				label: "working at",
				submenu: workingAtSubmenu,
			},
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
