import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-hot-toast';

import { CommentPayload, CreatePostPayload, Posts } from '@/typings/posts';
import { ProfileStored, PutProfileByIdPayload } from '@/typings/profile';

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
    getNewToken: build.mutation({
      query: () => ({
        url: 'https://securetoken.googleapis.com/v1/token',
        params: { key: process.env.NEXT_PUBLIC_FIREBASE_API_KEY },
        body: {
          grant_type: 'refresh_token',
          refresh_token: JSON.parse(localStorage.getItem('auth') ?? '').refreshToken,
        },
      }),
      transformResponse: (body: { refresh_token: string; id_token: string }) => {
        const auth = JSON.parse(localStorage.getItem('auth') ?? '');
        auth.refreshToken = body.refresh_token;
        auth.token = body.id_token;
        localStorage.setItem('auth', auth);
      },
    }),

    getProfileById: build.query<ProfileStored, string>({
      query: (id) => `/profile/${id}`,
      providesTags: (result) => [{ type: 'Profile', id: result?.uid }],
    }),
    putProfileById: build.mutation<
      ProfileStored,
      {
        id: string;
        data: Partial<PutProfileByIdPayload>;
      }
    >({
      invalidatesTags: (result) => [{ type: 'Profile', id: result?.uid }],
      query: ({ id, data }) => {
        return {
          url: `profile/${id}`,
          method: 'PUT',
          body: data,
          headers: {
            authentication: JSON.parse(localStorage.getItem('auth') ?? '').token,
          },
        };
      },
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
  usePutProfileByIdMutation,
  useGetNewTokenMutation,
} = profileApi;
