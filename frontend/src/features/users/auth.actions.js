import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWrapper } from 'helpers';

const name = 'authActions';

// Backend URL
const authUrl = `${process.env.REACT_APP_API_URL}/api/auth/signin`;
const signUpUrl = `${process.env.REACT_APP_API_URL}/api/auth/signup`;
const editProfilUrl = `${process.env.REACT_APP_API_URL}/api/user-update`;
const myProfileUrlGet = `${process.env.REACT_APP_API_URL}/api/myprofile`;

// Action login
export const authLogin = createAsyncThunk(
  `${name}/login`,
  async ({ email, password }) =>
    await fetchWrapper.post(authUrl, {
      email,
      password
    })
);

// Action signup
export const signUp = createAsyncThunk(
  `${name}/signUp`,
  async ({ email, password }) =>
    await fetchWrapper.post(signUpUrl, {
      email,
      password
    })
);

// Action edit profil
export const profilEdit = createAsyncThunk(
  `${name}/editProfil`,
  async (data, { rejectWithValue }) =>
    await fetchWrapper.put(editProfilUrl, data)
);

// Action get myprofil
export const myProfile = createAsyncThunk(
  `${name}/getMyProfile`,
  async () => await fetchWrapper.get(myProfileUrlGet)
);
