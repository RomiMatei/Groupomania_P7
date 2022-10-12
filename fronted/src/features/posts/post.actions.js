import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWrapper } from 'helpers';

const name = 'post';
const postBaseUrlGet = `${process.env.REACT_APP_API_URL}/api/posts-get`;
// const postBaseUrlCreate = `${process.env.REACT_APP_API_URL}/api/posts-create`;
const postBaseUrlDelete = `${process.env.REACT_APP_API_URL}/api/posts-delete`;
const likeBaseUrlGetPost = `${process.env.REACT_APP_API_URL}/api/posts-likes`;

// export const postCreate = createAsyncThunk(
//   `${name}/createPosts`,
//   async ({author, content, image}, { rejectWithValue }) =>
//     await fetchWrapper.post(baseUrlCreate, {author, content, image})
// );

export const postGet = createAsyncThunk(
  `${name}/getPost`,
  async ({ id }, { rejectWithValue }) =>
    await fetchWrapper.post(`${postBaseUrlGet}/${id}`)
);

export const postDelete = createAsyncThunk(
  `${name}/deletePosts`,
  async ({ id }, { rejectWithValue }) =>
    await fetchWrapper.delete(`${postBaseUrlDelete}/${id}`)
);

export const postLikeGet = createAsyncThunk(
  `${name}/getLikePost`,
  async ({ id }, { rejectWithValue }) =>
    await fetchWrapper.post(`${likeBaseUrlGetPost}/${id}`)
);
