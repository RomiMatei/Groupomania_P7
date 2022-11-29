import { createSlice } from '@reduxjs/toolkit';

// Initial state for Redux store:
const initialState = {
  open: false,
  message: '',
  severity: 'success'
};

// Create Redux state slice
const message = createSlice({
  name: 'message',
  initialState, // Define initial state
  reducers: {
    messageShow: (state, action) => {
      // Action show SnackBar message
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    messageClear: (state, action) => {
      // Action clear SnackBar message
      state.open = false;
    }
  }
});

export const { messageShow, messageClear } = message.actions;
export const messageReducer = message.reducer;
