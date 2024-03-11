import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const sidemenuSlice = createSlice({
	name: 'sidemenu',
	initialState: initialState,
	reducers: {
		toggleSidemenu: (state) => {
			return (state = !state);
		},
	},
});

export const { toggleSidemenu } = sidemenuSlice.actions;

export default sidemenuSlice.reducer;
