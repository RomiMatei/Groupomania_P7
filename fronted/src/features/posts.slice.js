import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchWrapper } from 'helpers';

// create slice

const name = 'posts';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const postsActions = { ...slice.actions, ...extraActions };
export const postsReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        posts: {}
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/api/posts-all`;
    const baseUrlCreate = `${process.env.REACT_APP_API_URL}/api/posts-create`;

    return {
        allPosts: allPosts(),
        createPosts: createPosts()
    };

    function allPosts() {
        return createAsyncThunk(
            `${name}/allPosts`,
            async () => await fetchWrapper.get(baseUrl)
        );
    };
    function createPosts() {
        return createAsyncThunk(
            `${name}/createPosts`,
            async ({author, content, image}) => await fetchWrapper.post(baseUrlCreate, {author, content, image})
        );
    };
}


function createExtraReducers() {
    return {
        ...allPosts(),
        ...createPosts()
    };

    function allPosts() {
        var { pending, fulfilled, rejected } = extraActions.allPosts;
        return {
            [pending]: (state) => {
                state.posts = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.posts = action.payload;
            },
            [rejected]: (state, action) => {
                state.posts = { error: action.error };
            }
        };
    };
    function createPosts() {
        var { pending, fulfilled, rejected } = extraActions.createPosts;
        return {
            [pending]: (state) => {
                state.posts = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.posts = action.payload;
            },
            [rejected]: (state, action) => {
                state.posts = { error: action.error };
            }
        };
    }
}
