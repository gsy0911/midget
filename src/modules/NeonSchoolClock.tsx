import React, {useState, useEffect} from 'react';
import {NeonBox} from './NeonBox';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {TimetableProps, ModeProps, NeonSchoolClockProps, longTimeBreakMode} from '../states';
import {defaultTimeTable} from '../states';
import {setWorkingAt, setModeUntil, setModes} from "../ducks/configSlice";


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
	const {workingAt, modeUntil, currentMode, nextMode} = useSelector((state: RootState) => state.config.data)

	const [timetable, setTimetable] = useState<TimetableProps>(defaultTimeTable)
	const initialMode = timetable.modes[timetable.initial]
	// states
	const [date, setDate] = useState<Date>(new Date())
	const [count, setCount] = useState<number>(initialMode.durationMinute * 60)
	const [loopCount, setLoopCount] = useState<number>(1)
	const dispatch = useDispatch()

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
		const currentEpoch = Math.floor(date.getTime() / 1000)
		if (modeUntil <= currentEpoch) {
			dispatch(setModes({current: nextMode, next: timetable.modes[nextMode.next]}))
			if (currentMode.next === timetable.initial) {
				setLoopCount(loopCount => loopCount + 1)
			}
		}
	}, [date, timetable])

	// check loops
	useEffect(() => {
		setCount(currentMode.durationMinute * 60)
		const untilEpoch = Math.floor((new Date).getTime() / 1000) + currentMode.durationMinute * 60
		dispatch(setModeUntil(untilEpoch))
	}, [currentMode, timetable])

	// load timetable from config once
	useEffect(() => {
		window.contextBridge.loadConfig().then(data => {
			if (data.timetable) {
				setTimetable(data.timetable)
				const mode = data.timetable.modes[data.timetable.initial]
				dispatch(setModes({current: mode, next: data.timetable.modes[mode.next]}))
			}
		}).catch(err => {
			console.log(err)
		})
	}, [])

	// after mode changed
	useEffect(() => {
		window.contextBridge.onLongTimeBreak().then(data => {
			console.log(`time to rest ${data}[min]`)
			dispatch(setModes({current: longTimeBreakMode, next: currentMode}))
		}).catch(err => {
			console.log(err)
		})
	}, [currentMode])

	useEffect(() => {
		window.contextBridge.onChangeWorkingAt().then(data => {
			console.log(`working at ${data}`)
			dispatch(setWorkingAt(data))
		}).catch(err => {
			console.log(err)
		})
	}, [workingAt])

	return (
		<NeonBox
			header={`Loop: ${loopCount}@${workingAt}`}
			title={currentMode.title}
			subtitle={`${dateToString(date)} JST\n${countToMinuteSecond(count)}`}
			color={currentMode.color}
		/>
	)
}
