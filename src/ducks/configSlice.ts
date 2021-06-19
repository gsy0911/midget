import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IApplicationState, defaultApplicationState, ModeProps} from '../states';

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
		},
		setCurrentMode: (state, action: PayloadAction<ModeProps>) => {
			state.data.currentMode = action.payload
		}
	}
})

export const {setWorkingAt, setModeUntil, setCurrentMode} = configSlice.actions
export default configSlice.reducer

