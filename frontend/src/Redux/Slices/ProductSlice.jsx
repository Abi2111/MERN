import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk('fetchProducts', async () => {
  const response = await fetch('http://localhost:8000/products');
  return response.json();
});

const productsSlice = createSlice({
  name: 'Products',
  initialState: {
    products: null,
    productDetails: '',
    cart: 0,
    isLoading: false,
    isError: false,
  },
  extraReducers: bulider => {
    bulider.addCase(fetchProducts.pending, (state, action) => {
      state.isLoading = true;
      console.log(action.payload);
    });
    bulider.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    bulider.addCase(fetchProducts.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = action.payload;
    });
  },
});

export default productsSlice.reducer;
