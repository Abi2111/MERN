import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    shippingInfo: {},
    orderItems: [],
    paymentMethod: '',
    paymentInfo: {},
    itemsPrice: 0,
    taxAmount: 0,
    shippingAmount: 0,
    totalAmount: 0,
  },
  reducers: {
    SetShippingInfo(state, action) {
      state.shippingInfo = action.payload;
    },
    setPaymentMethod(state, action) {
      state.paymentMethod = action.payload;
    },
    setOrderItems(state, action) {
      state.orderItems = action.payload;
    },
    setItemsPrice(state, action) {
      state.itemsPrice = action.payload;
    },
    SetShippingAmount(state, action) {
      state.shippingAmount = action.payload;
    },
    setTotalAmount(state, action) {
      state.totalAmount = action.payload;
    },
  },
});

export default orderSlice.reducer;
export const {
  SetShippingInfo,
  setPaymentMethod,
  setOrderItems,
  setItemsPrice,
  SetShippingAmount,
  setTotalAmount,
} = orderSlice.actions;
