import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
  tagTypes: ['Profile'],
  endpoints: (build) => ({
    getProfileById: build.query<Profile, string>({
      query: (id) => `/profile/${id}`,
      providesTags: (result) => [{ type: 'Profile', id: result?.data.username }],
    }),
  }),
});

export const { useGetProfileByIdQuery } = profileApi;
