import { configureStore } from '@reduxjs/toolkit';

import { authApi } from '@/services/auth';
import { profileApi } from '@/services/profile';
import { securedProfileApi } from '@/services/secured/profile';
import { tenorApi } from '@/services/tenorApi';

import appSlice from './slices/appSlice';
import postMessageSlice from './slices/postMessageSlice';
// ...

const store = configureStore({
  reducer: {
    [tenorApi.reducerPath]: tenorApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [securedProfileApi.reducerPath]: securedProfileApi.reducer,
    postMessage: postMessageSlice,
    app: appSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tenorApi.middleware, profileApi.middleware),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
