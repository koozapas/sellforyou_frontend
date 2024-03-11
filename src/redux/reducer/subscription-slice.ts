import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = null;

const subscriptionSlice = createSlice({
	name: 'subscription',
	initialState: initialState,
	reducers: {
		setSubscription: (state, action: PayloadAction<any>) => {
			return (state = action.payload);
		},
	},
});

export const { setSubscription } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
