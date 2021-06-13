import {IConfig} from './IConfig';

export interface IContextBridge {
	loadConfig: () => Promise<IConfig>;
}

// add core-definition to window-object
declare global {
	interface Window {
		contextBridge: IContextBridge;
	}
}
