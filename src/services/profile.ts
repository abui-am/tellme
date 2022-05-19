import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-hot-toast';

import { CommentPayload, CreatePostPayload, Posts } from '@/typings/posts';
import { ProfileStored } from '@/typings/profile';

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: '/api/v1',
});

export interface Data {
  username: string;
  description: string;
  fullName: string;
}

// profile
export const profileApi = createApi({
  baseQuery,
  tagTypes: ['Profile', 'Myself', 'ProfilePost'],
  reducerPath: 'profileApi',
  endpoints: (build) => ({
    getProfileById: build.query<ProfileStored, string>({
      query: (id) => `/profile/${id}`,
      providesTags: (result) => [{ type: 'Profile', id: result?.uid }],
    }),
    getProfileByUsername: build.query<ProfileStored, string>({
      query: (username) => `/profile/username/${username}`,
      providesTags: (result) => [{ type: 'Profile', username: result?.username }],
      transformResponse: (res: { data: ProfileStored }) => {
        return res?.data;
      },
    }),
    getPostsByProfileId: build.query<Posts, string>({
      query: (id) => `/profile/${id}/posts`,
      providesTags: ['ProfilePost'],
    }),
    sendMessage: build.mutation<Posts, CreatePostPayload>({
      invalidatesTags: ['ProfilePost'],
      query: ({ profileId, ...props }) => {
        return {
          url: `profile/${profileId}/posts`,
          method: 'POST',
          body: props,
        };
      },
      transformResponse: (res: Posts) => {
        toast.success(res.message);
        return res;
      },
    }),
    postComment: build.mutation<Posts, CommentPayload>({
      invalidatesTags: ['ProfilePost'],
      query: ({ comment, postId }) => {
        return {
          url: `posts/${postId}/comment`,
          method: 'POST',
          body: {
            comment,
          },
        };
      },
      transformResponse: (res: Posts) => {
        toast.success(res.message);
        return res;
      },
    }),
  }),
});

export const {
  useGetProfileByIdQuery,
  useGetPostsByProfileIdQuery,
  usePostCommentMutation,
  useSendMessageMutation,
  useGetProfileByUsernameQuery,
} = profileApi;
