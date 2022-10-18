import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWrapper } from 'helpers';

const name = 'userActions';
const usersUrlGet = `${process.env.REACT_APP_API_URL}/api/users`;

export const getAllUsers = createAsyncThunk(
  `${name}/getAllUsers`,
  async () => await fetchWrapper.get(usersUrlGet)
);
