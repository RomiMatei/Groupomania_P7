import { createSlice } from '@reduxjs/toolkit';
import {
  postCreate,
  postAll,
  postDelete,
  postLikePost,
  postEdit
} from './posts.actions';

// Initial state for Redux store:
const initialState = {
  postsList: {}
};

// Create Redux state slice
const postsSlice = createSlice({
  name: 'posts',
  initialState, // Define initial state
  extraReducers: {
    // Post create actions
    [postCreate.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [postCreate.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.postsList.push(payload);
    },
    [postCreate.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // Posts get actions
    [postAll.pending]: (state) => {
      state.loading = true;
      state.error = null;
      // state = {loading: true};
    },
    [postAll.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.postsList = payload;
    },
    [postAll.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // Action Post delete
    [postDelete.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [postDelete.fulfilled]: (state, { payload, meta }) => {
      state.loading = false;
      state.success = true;
      state.postsList = state.postsList.filter((b) => b.id !== meta.arg);
    },
    [postDelete.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // Action Post update
    [postEdit.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [postEdit.fulfilled]: (state, { payload, meta }) => {
      state.loading = false;
      state.success = true;
      const postId = parseInt(payload.dataValues.id);
      state.postsList.map((post) => {
        if (post.id === postId) {
          if (payload.dataValues.content) {
            post['content'] = payload.dataValues.content;
          }
          if (payload.dataValues.image) {
            post['image'] = payload.dataValues.image;
          }
        } else return post;
      });
    },
    [postEdit.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // Action like or unlike Post
    [postLikePost.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [postLikePost.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [postLikePost.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    }
  }
});

// Export reducer generated by "createSlice()":
export const postsReducer = postsSlice.reducer;
