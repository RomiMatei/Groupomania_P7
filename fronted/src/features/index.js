import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth.slice';
import { usersReducer } from './users.slice';
import { postsReducer } from './posts/posts.slice';

export * from './auth.slice';
export * from './users.slice';
// export * from './posts/posts.slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        posts: postsReducer,
    },
});
