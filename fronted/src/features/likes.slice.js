import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchWrapper } from 'helpers';

// create slice

const name = 'likes';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const likeActions = { ...slice.actions, ...extraActions };
export const likesReducer = slice.reducer;

// implementation

function createInitialState() {
  return {
    likes: {}
  };
}

function createExtraActions(arg) {
  const baseUrl = `${process.env.REACT_APP_API_URL}/api/posts-likes/:1`;

  return {
    getLikes: getLikes()
  };

  function getLikes(arg) {
    console.log(arg);
    return createAsyncThunk(
      `${name}/getLikes`,
      async () => await fetchWrapper.get(baseUrl)
    );
  }
}

function createExtraReducers() {
  return {
    ...getLikes()
  };

  function getLikes(arg) {
    console.log(arg);
    var { pending, fulfilled, rejected } = extraActions.getLikes;
    return {
      [pending]: (state) => {
        state.likes = { loading: true };
      },
      [fulfilled]: (state, action) => {
        state.likes = action.payload;
      },
      [rejected]: (state, action) => {
        state.likes = { error: action.error };
      }
    };
  }
}
