import { createSlice } from '@reduxjs/toolkit';

import { authLogin, signUp, profilEdit, myProfile } from './auth.actions';
import { history } from 'helpers';

// Initial state for Redux store:
const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  error: null,
  isEditMode: false
};

// Create Redux state slice
const auth = createSlice({
  name: 'auth',
  initialState, // Define initial state
  reducers: {
    logout: (state, action) => {
      state.user = null;
      localStorage.removeItem('user');
      history.navigate('/login');
    },
    isEditMode: (state, action) => {
      state.isEditMode = true;
    }
  },
  extraReducers: {
    // Auth user create actions
    [authLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [authLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload) {
        const userStorage = {
          id: payload.id,
          roles: payload.roles,
          token: payload.token,
          email: payload.email
        };
        localStorage.setItem('user', JSON.stringify(userStorage));
        state.user = payload;
        const { from } = history.location.state || { from: { pathname: '/' } };
        history.navigate(from);
      }
    },
    [authLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // SignUP Action
    [signUp.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [signUp.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;

      const { from } = history.location.state || { from: { pathname: '/' } };
      history.navigate(from);
    },
    [signUp.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // Profile Edit Action
    [profilEdit.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [profilEdit.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.isEditMode = false;
      state.user['image'] = payload.dataValues.image;
    },
    [profilEdit.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // My Profile get
    [myProfile.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [myProfile.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      const data = JSON.parse(window.localStorage.getItem('user'));
      delete payload.password;
      payload['token'] = data.token;
      state.user = payload;

    },
    [myProfile.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    }
  }
});

export const { logout, isEditMode } = auth.actions;
export const authReducer = auth.reducer;
