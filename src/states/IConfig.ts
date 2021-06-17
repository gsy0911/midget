import {TimetableProps, defaultTimeTable} from "./ITimetable";

export interface IConfigFile {
	windowSize: "small" | "medium" | "large"
	timetable?: TimetableProps
	workingAt: string[]
}

export const defaultConfigFile: IConfigFile = {
	windowSize: "medium",
	timetable: defaultTimeTable,
	workingAt: ["companyA", "companyB"]
}


export interface IApplicationState {
	windowSize: "small" | "medium" | "large"
	timetable: TimetableProps
	workingAt: string
}

export const defaultApplicationState: IApplicationState = {
	windowSize: "medium",
	timetable: defaultTimeTable,
	workingAt: "companyA"
}
