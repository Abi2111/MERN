import { configureStore } from '@reduxjs/toolkit';
import { productApi } from './APIS/productApi.js';
import { userApi } from './APIS/authApi.js';
import userSlice from './slices/userSlice.js';
export const store = configureStore({
  reducer: {
    user: userSlice,
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([productApi.middleware, userApi.middleware]),
});
