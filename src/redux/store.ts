import { configureStore } from '@reduxjs/toolkit';
import { postApi } from './api/postApi';
import postReducer from './features/postSlice';

export const store = configureStore({
  reducer: {
    post: postReducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
