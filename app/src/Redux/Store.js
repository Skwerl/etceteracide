import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSvc } from './Api';
import { tokenReducer } from './Slices';

export const Store = configureStore({
    reducer: {
        [apiSvc.reducerPath]: apiSvc.reducer,
        tokenReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        apiSvc.middleware
    )
});

setupListeners(Store.dispatch);