import {createSlice} from '@reduxjs/toolkit';
import {IConfig} from '../states';


interface IConfigStore {
	data: IConfig | undefined
}

const initialState: IConfigStore = {
	data: undefined,
}

export const configSlice = createSlice({
	name: 'ne10Config',
	initialState,
	reducers: {
		getConfig: (state, action) => {
			state.data = action.payload
		},
	}
})

export const {getConfig} = configSlice.actions
export default configSlice.reducer

