import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IApplicationState, defaultApplicationState, ModeProps} from '../states';

const initialState: {data: IApplicationState} = {
	data: defaultApplicationState,
}

interface ISetModes {
	current: ModeProps
	next: ModeProps
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
		setModes: (state, action: PayloadAction<ISetModes>) => {
			state.data.currentMode = action.payload.current
			state.data.nextMode = action.payload.next
		},
		setCurrentMode: (state, action: PayloadAction<ModeProps>) => {
			state.data.currentMode = action.payload
		},
		setNextMode: (state, action: PayloadAction<ModeProps>) => {
			state.data.nextMode = action.payload
		}
	}
})

export const {setWorkingAt, setModeUntil, setModes, setCurrentMode, setNextMode} = configSlice.actions
export default configSlice.reducer

