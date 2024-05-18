import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartVal: 0,
  },
  reducers: {
    setCartVal(state, action) {
      state.cartVal = state.cartVal + action.payload;
    },
  },
});

export default cartSlice.reducer;

export const { setCartVal } = cartSlice.actions;
