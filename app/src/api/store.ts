import { configureStore } from '@reduxjs/toolkit';
import tempapi from '.';

const store = configureStore({
    reducer: {
        [tempapi.reducerPath]: tempapi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tempapi.middleware),
});

export default store;
