import { ITask, ISetting } from "../states";

export interface ICore {
	loadTaskList: () => Promise<ITask[]>;
	saveTask: (task: ITask) => Promise<ITask[]>;
	deleteTask: (taskId: string) => Promise<ITask[]>;
	loadSetting: () => Promise<ISetting>;
	saveSetting: (setting: ISetting) => Promise<ISetting>;
}

// add core-definition to window-object
declare global {
	interface Window {
		core: ICore;
	}
}
