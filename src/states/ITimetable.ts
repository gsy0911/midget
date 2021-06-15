export interface ModeProps {
	durationMinute: number
	color: string
	title: string
	next: string
}

export interface TimetableProps {
	modes: { [modeName: string]: ModeProps },
	initial: string,
}

const workMode: ModeProps = {
	durationMinute: 55,
	color: "cyan",
	title: "WORK NOW",
	next: "break"
}

const breakMode: ModeProps = {
	durationMinute: 5,
	color: "orange",
	title: "REST",
	next: "work"
}

export const longTimeBreakMode: ModeProps = {
	durationMinute: 60,
	color: "silver",
	title: "LONG REST",
	next: "work"
}

export const defaultTimeTable: TimetableProps = {
	modes: {
		work: workMode,
		break: breakMode
	},
	initial: "work"
}

export interface NeonSchoolClockProps {
	timetable: TimetableProps
}
