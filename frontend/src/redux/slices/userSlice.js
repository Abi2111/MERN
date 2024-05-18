import { createSlice } from '@reduxjs/toolkit';

export const user = createSlice({
  name: 'user',
  initialState: {
    user: {},
    isAuthenticated: false,
    isLoading: true,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export default user.reducer;

export const { setIsAuthenticated, setIsLoading, setUser } = user.actions;
