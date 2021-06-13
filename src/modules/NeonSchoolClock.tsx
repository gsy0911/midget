import React, {useState, useEffect} from 'react';
import {NeonBox} from './NeonBox';


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
	durationMinute: 10,
	color: "cyan",
	title: "WORK NOW",
	next: "break"
}

const breakMode: ModeProps = {
	durationMinute: 1,
	color: "orange",
	title: "REST",
	next: "work"
}

const defaultTimeTable: TimetableProps = {
	modes: {
		work: workMode,
		break: breakMode
	},
	initial: "work"
}

export interface NeonSchoolClockProps {
	timetable?: TimetableProps
}

const dateToString = (date: Date): string => {
	const hour = date.getHours()
	const minute = date.getMinutes()
	if (hour < 10 && minute < 10) {
		return `0${hour}:0${minute}`
	} else if (hour < 10) {
		return `0${hour}:${minute}`
	} else if (minute < 10) {
		return `${hour}:0${minute}`
	} else {
		return `${hour}:${minute}`
	}
}

export const NeonSchoolClock: React.FC<NeonSchoolClockProps> = (props) => {
	const {modes, initial} = props.timetable || defaultTimeTable
	const initialMode = modes[initial]
	// states
	const [date, setDate] = useState<Date>(new Date())
	const [mode, setMode] = useState<ModeProps>(initialMode)
	const [count, setCount] = useState<number>(initialMode.durationMinute * 60)
	const [loopCount, setLoopCount] = useState<number>(1)

	useEffect(() => {
		const interval = setInterval(() => {
			setDate(() => new Date());
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	// ticks 1[sec]
	useEffect(() => {
		setCount(count => count - 1)
		if (count <= 0) {
			setMode(mode => modes[mode.next])
			if (mode.next === initial) {
				setLoopCount(loopCount => loopCount + 1)
			}
		}
	}, [date])

	// check loops
	useEffect(() => {
		setCount(mode.durationMinute * 60)
	}, [mode])

	return (
		<NeonBox
			header={`Loop: ${loopCount}`}
			title={mode.title}
			subtitle={`${dateToString(date)} JST`}
			color={mode.color}
		/>
	)
}
