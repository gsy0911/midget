import {IConfig} from '../states';

export interface ICore {
	loadConfig: () => Promise<IConfig>;
}

// add core-definition to window-object
declare global {
	interface Window {
		core: ICore;
	}
}
