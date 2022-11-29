import { createSlice } from '@reduxjs/toolkit';

import { getAllUsers } from './users.actions';

// Initial state for Redux store:
const initialState = {
  usersList: {}
};

// Create Redux state slice
const users = createSlice({
  name: 'users',
  initialState, // Define initial state
  extraReducers: {
    // Users get actions
    [getAllUsers.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getAllUsers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.usersList = payload;
    },
    [getAllUsers.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    }
  }
});

// Export actions
export const usersReducer = users.reducer;
