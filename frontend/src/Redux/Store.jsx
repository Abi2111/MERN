import { configureStore } from '@reduxjs/toolkit';
import reducer from './Slices/ProductSlice';
const store = configureStore({
  reducer,
});

export default store;
