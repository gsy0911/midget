import React, {useState, useEffect} from 'react';
import {NeonBox} from './NeonBox';
import {TimetableProps, ModeProps, NeonSchoolClockProps} from '../states';
import {defaultTimeTable} from '../states';


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

export const NeonSchoolClock: React.FC = (props) => {
	const [timetable, setTimetable] = useState<TimetableProps>(defaultTimeTable)
	const initialMode = timetable.modes[timetable.initial]
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
			setMode(mode => timetable.modes[mode.next])
			if (mode.next === timetable.initial) {
				setLoopCount(loopCount => loopCount + 1)
			}
		}
	}, [date, timetable])

	// check loops
	useEffect(() => {
		setCount(mode.durationMinute * 60)
	}, [mode, timetable])

	// load timetable from config
	useEffect(() => {
		window.contextBridge.loadConfig().then(data => {
			if (data.timetable) {
				setTimetable(data.timetable)
				setMode(data.timetable.modes[data.timetable.initial])
			}
		}).catch(err => {
			console.log(err)
		})
	}, [])

	return (
		<NeonBox
			header={`Loop: ${loopCount}`}
			title={mode.title}
			subtitle={`${dateToString(date)} JST\n${Math.floor(count / 60)}[min]`}
			color={mode.color}
		/>
	)
}
