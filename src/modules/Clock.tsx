import React, {useState, useEffect} from 'react';
import {Theme, makeStyles} from '@material-ui/core/styles';
import {NeonText, NeonTextProps} from './NeonText';


export interface ClockProps extends Partial<NeonTextProps> {
}

export const Clock: React.FC<ClockProps> = (props) => {
	const [date, setDate] = useState(new Date())

	useEffect(() => {
		const interval = setInterval(() => {
			setDate(() => new Date());
		}, 1000 * 10);
		return () => clearInterval(interval);
	}, []);

	return (
		<NeonText text={`${date.getHours()}:${date.getMinutes()}`}/>
	)
}
