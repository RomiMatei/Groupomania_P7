import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWrapper } from 'helpers';

const name = 'posts';

// URL backend
const postBaseUrlAllGet = `${process.env.REACT_APP_API_URL}/api/posts-all`;
const baseUrlCreate = `${process.env.REACT_APP_API_URL}/api/posts-create`;
const baseUrlEdit = `${process.env.REACT_APP_API_URL}/api/posts-update`;
const postBaseUrlDelete = `${process.env.REACT_APP_API_URL}/api/posts-delete`;
const likeBaseUrlGetPost = `${process.env.REACT_APP_API_URL}/api/posts-likes`;

// Action create post
export const postCreate = createAsyncThunk(
  `${name}/createPosts`,
  async (data, { rejectWithValue }) =>
    await fetchWrapper.post(baseUrlCreate, data)
);

// Action gett all post
export const postAll = createAsyncThunk(
  `${name}/allPosts`,
  async () => await fetchWrapper.get(postBaseUrlAllGet)
);

// Action edit post
export const postEdit = createAsyncThunk(
  `${name}/editPosts`,
  async (data, { rejectWithValue }) => await fetchWrapper.put(baseUrlEdit, data)
);

// Action delete post
export const postDelete = createAsyncThunk(
  `${name}/deletePosts`,
  async (id, { rejectWithValue }) =>
    await fetchWrapper.delete(`${postBaseUrlDelete}/${id}`)
);

// Action get likes for a post
export const postLikeGet = createAsyncThunk(
  `${name}/getLikePost`,
  async (data, { rejectWithValue }) =>
    await fetchWrapper.get(`${likeBaseUrlGetPost}/${data}`)
);

// Action send like for a post
export const postLikePost = createAsyncThunk(
  `${name}/postLikePost`,
  async (data, { rejectWithValue }) =>
    await fetchWrapper.post(`${likeBaseUrlGetPost}/${data}`)
);
