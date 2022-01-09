import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-hot-toast';

import { CreatePostPayload, Posts } from '@/typings/posts';

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: '/api/v1',
});

export interface Data {
  username: string;
  description: string;
  fullName: string;
}

export interface Profile {
  data: Data;
  message: string;
  status: number;
}

export const profileApi = createApi({
  baseQuery,
  tagTypes: ['Profile', 'ProfilePost'],
  endpoints: (build) => ({
    getProfileById: build.query<Profile, string>({
      query: (id) => `/profile/${id}`,
      providesTags: (result) => [{ type: 'Profile', id: result?.data.username }],
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
  }),
});

export const { useGetProfileByIdQuery, useGetPostsByProfileIdQuery, useSendMessageMutation } = profileApi;
