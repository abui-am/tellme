import { configureStore } from '@reduxjs/toolkit';

import { profileApi } from '@/services/profile';

import appSlice from './slices/appSlice';
import postMessageSlice from './slices/postMessageSlice';
// ...

const store = configureStore({
  reducer: {
    [profileApi.reducerPath]: profileApi.reducer,
    postMessage: postMessageSlice,
    app: appSlice,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
