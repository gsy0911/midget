import {TimetableProps, defaultTimeTable} from "./ITimetable";

export interface IConfig {
	windowSize: "small" | "medium" | "large"
	timetable?: TimetableProps
}

export const defaultConfig: IConfig = {
	windowSize: "medium",
	timetable: defaultTimeTable
}
