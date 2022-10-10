import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWrapper } from 'helpers';

const name = 'posts';
const baseUrlGetAll = `${process.env.REACT_APP_API_URL}/api/posts-all`;
const baseUrlCreate = `${process.env.REACT_APP_API_URL}/api/posts-create`;
const baseUrlDelete = `${process.env.REACT_APP_API_URL}/api/posts-delete`;

export const postCreate = createAsyncThunk(
  `${name}/createPosts`,
  async ({author, content, image}, { rejectWithValue }) =>
    await fetchWrapper.post(baseUrlCreate, {author, content, image})
);

export const postAll = createAsyncThunk(
  `${name}/allPosts`,
  async () => await fetchWrapper.get(baseUrlGetAll)
);

export const postDelete = createAsyncThunk(
  `${name}/deletePosts`,
  async ({ id }, { rejectWithValue }) =>
    await fetchWrapper.delete(`${baseUrlDelete}/${id}`)
);
