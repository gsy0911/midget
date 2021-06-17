import React, {useState, useEffect} from 'react';
import {NeonBox} from './NeonBox';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {TimetableProps, ModeProps, NeonSchoolClockProps, longTimeBreakMode} from '../states';
import {defaultTimeTable} from '../states';
import {setWorkingAt} from "../ducks/configSlice";


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

const countToMinuteSecond = (count: number): string => {
	if (count <= 60) {
		return `${count}[sec]`
	} else {
		return `${Math.floor(count / 60)}[min]`
	}
}

export const NeonSchoolClock: React.FC = (props) => {
	// status from redux
	const {workingAt} = useSelector((state: RootState) => state.config.data)

	const [timetable, setTimetable] = useState<TimetableProps>(defaultTimeTable)
	const initialMode = timetable.modes[timetable.initial]
	// states
	const [date, setDate] = useState<Date>(new Date())
	const [mode, setMode] = useState<ModeProps>(initialMode)
	// const [nextMode, setNextMode] = useState<ModeProps>(timetable.modes[initialMode.next])
	const [count, setCount] = useState<number>(initialMode.durationMinute * 60)
	const [loopCount, setLoopCount] = useState<number>(1)
	// working at
	// const [workingAt, setWorkingAt] = useState<string>("none")

	// ticks 1[sec]
	useEffect(() => {
		const interval = setInterval(() => {
			setDate(() => new Date());
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	// changes every 1[sec]
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

	// load timetable from config once
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

	// after mode changed
	useEffect(() => {
		window.contextBridge.onLongTimeBreak().then(data => {
			console.log(`time to rest ${data}[min]`)
			// setNextMode(timetable.modes[longTimeBreakMode.next])
			setMode(longTimeBreakMode)
		}).catch(err => {
			console.log(err)
		})
	}, [])


	return (
		<NeonBox
			header={`Loop: ${loopCount}@${workingAt}`}
			title={mode.title}
			subtitle={`${dateToString(date)} JST\n${countToMinuteSecond(count)}`}
			color={mode.color}
		/>
	)
}
