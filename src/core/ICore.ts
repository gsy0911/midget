export interface ICore {
}

// add core-definition to window-object
declare global {
	interface Window {
		core: ICore;
	}
}
