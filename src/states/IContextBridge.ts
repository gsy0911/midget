import {IConfig} from './IConfig';

export interface IContextBridge {
	loadConfig: () => Promise<IConfig>;
	onLongTimeBreak: () => Promise<number>;
	onChangeWorkingAt: () => Promise<string>
}

// add core-definition to window-object
declare global {
	interface Window {
		contextBridge: IContextBridge;
	}
}
