import {TimetableProps, defaultTimeTable} from "./ITimetable";

export interface IConfig {
	windowSize: "small" | "medium" | "large"
	timetable?: TimetableProps
	workingAt: string[]
}

export const defaultConfig: IConfig = {
	windowSize: "medium",
	timetable: defaultTimeTable,
	workingAt: ["companyA", "companyB"]
}
