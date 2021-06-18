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
	}
})

export const {setWorkingAt} = configSlice.actions
export default configSlice.reducer

