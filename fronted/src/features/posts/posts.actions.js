import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWrapper } from 'helpers';

const name = 'posts';
const postBaseUrlAllGet = `${process.env.REACT_APP_API_URL}/api/posts-all`;
const postBaseUrlGet = `${process.env.REACT_APP_API_URL}/api/posts-get`;
const baseUrlCreate = `${process.env.REACT_APP_API_URL}/api/posts-create`;
const baseUrlEdit = `${process.env.REACT_APP_API_URL}/api/posts-update`;
const postBaseUrlDelete = `${process.env.REACT_APP_API_URL}/api/posts-delete`;
const likeBaseUrlGetPost = `${process.env.REACT_APP_API_URL}/api/posts-likes`;

export const postCreate = createAsyncThunk(
  `${name}/createPosts`,
  async (data, { rejectWithValue }) =>
    await fetchWrapper.post(baseUrlCreate, data)
);

export const postAll = createAsyncThunk(
  `${name}/allPosts`,
  async () => await fetchWrapper.get(postBaseUrlAllGet)
);

export const postEdit = createAsyncThunk(
  `${name}/editPosts`,
  async (data, { rejectWithValue }) =>
    await fetchWrapper.put(baseUrlEdit, data)
);

export const postDelete = createAsyncThunk(
  `${name}/deletePosts`,
  async (id, { rejectWithValue }) =>
    await fetchWrapper.delete(`${postBaseUrlDelete}/${id}`)
);

export const postLikeGet = createAsyncThunk(
  `${name}/getLikePost`,
  async (data, { rejectWithValue }) =>
    await fetchWrapper.get(`${likeBaseUrlGetPost}/${data}`)
);

export const postLikePost = createAsyncThunk(
  `${name}/postLikePost`,
  async (data, { rejectWithValue }) =>
    await fetchWrapper.post(`${likeBaseUrlGetPost}/${data}`)
);
