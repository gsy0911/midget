import fs from "fs-extra";
import {ICore} from "./ICore";
import {IConfig, defaultConfig} from '../states';
import path from "path";
import os from "os";

const configFilePath = path.join(os.homedir(), "ne10_config.json");

const loadConfig = async (): Promise<IConfig> => {
	const exist = await fs.pathExists(configFilePath);

	if (!exist) {
		fs.ensureFileSync(configFilePath);
		await fs.writeJSON(configFilePath, {data: defaultConfig});
	}

	const jsonData = (await fs.readJSON(configFilePath)) as { data: IConfig };
	return jsonData.data;
};

export const core: ICore = {
	loadConfig,
};
