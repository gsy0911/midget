import {ModeProps, workMode, breakMode, TimetableProps, defaultTimeTable} from "./ITimetable";

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
	currentMode: ModeProps
	modeUntil: number
	nextMode: ModeProps
	workingAt: string
}

export const defaultApplicationState: IApplicationState = {
	windowSize: "medium",
	timetable: defaultTimeTable,
	currentMode: workMode,
	modeUntil: 0,
	nextMode: breakMode,
	workingAt: "companyA"
}
