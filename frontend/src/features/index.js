import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './users/auth.slice';
import { usersReducer } from './users/users.slice';
import { messageReducer } from './messages.slice';
import { postsReducer } from './posts/posts.slice';

export * from './users/auth.actions';
export * from './users/auth.slice';
export * from './users/users.actions';
export * from './messages.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    posts: postsReducer,
    messages: messageReducer
  }
});
