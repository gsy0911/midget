import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IApplicationState, defaultApplicationState} from '../states';

const initialState: {data: IApplicationState} = {
	data: defaultApplicationState,
}

export const configSlice = createSlice({
	name: 'ne10Config',
	initialState,
	reducers: {
		setWorkingAt: (state, action: PayloadAction<string>) => {
			state.data.workingAt = action.payload
		},
		setModeUntil: (state, action: PayloadAction<number>) => {
			state.data.modeUntil = action.payload
		}
	}
})

export const {setWorkingAt, setModeUntil} = configSlice.actions
export default configSlice.reducer

