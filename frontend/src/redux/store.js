import { configureStore } from '@reduxjs/toolkit';
import { productApi } from './APIS/productApi.js';
import { authApi } from './APIS/authApi.js';
import { userApi } from './APIS/userApi.js';
import { cartApi } from './APIS/cartApi.js';
import userSlice from './slices/userSlice.js';
import cartSlice from './slices/cartSlice.js';
export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([
      productApi.middleware,
      authApi.middleware,
      userApi.middleware,
      cartApi.middleware,
    ]),
});
