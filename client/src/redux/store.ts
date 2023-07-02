import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { appReducer } from './reducers';

export const store = configureStore({
    reducer: appReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
