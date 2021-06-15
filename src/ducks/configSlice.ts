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
		setConfig: (state, action) => {
			state.data = action.payload
		},
	}
})

export const {setConfig} = configSlice.actions
export default configSlice.reducer

