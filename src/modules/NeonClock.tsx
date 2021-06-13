import React, {useState, useEffect} from 'react';
import {Theme, makeStyles} from '@material-ui/core/styles';
import {NeonText, NeonTextProps} from './NeonText';


export interface ClockProps extends Partial<NeonTextProps> {
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

export const NeonClock: React.FC<ClockProps> = (props) => {
	const [date, setDate] = useState(new Date())

	useEffect(() => {
		const interval = setInterval(() => {
			setDate(() => new Date());
		}, 1000 * 10);
		return () => clearInterval(interval);
	}, []);

	return (
		<NeonText
			text={`${dateToString(date)} JST`}
			textColor={props.textColor}
			animation={props.animation}/>
	)
}
