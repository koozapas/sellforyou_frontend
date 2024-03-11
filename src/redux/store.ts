import { combineReducers, configureStore } from '@reduxjs/toolkit';
import subScriptionReducer from './reducer/subscription-slice';
import sidemenuReducer from './reducer/sidemenu-slice';

const rootReducer = combineReducers({
	subscription: subScriptionReducer,
	sidemenu: sidemenuReducer,
});

export type CoreState = ReturnType<typeof rootReducer>;

export default configureStore({
	reducer: rootReducer,
	devTools: true,
});
