import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSvc } from './Api';

export const redux = configureStore({
    reducer: {
        [apiSvc.reducerPath]: apiSvc.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        apiSvc.middleware
    )
});

setupListeners(redux.dispatch);