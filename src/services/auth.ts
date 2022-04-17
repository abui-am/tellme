import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-hot-toast';

import { LoginPayload, LoginResponse, PostLoginData, SignUpPayload, SignUpWithGoogle } from '@/typings/auth';

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: '/api/v1/auth',
});

// profile
export const authApi = createApi({
  baseQuery,
  tagTypes: ['Auth'],
  reducerPath: 'auth',
  endpoints: (build) => ({
    postSignUp: build.mutation<PostLoginData, SignUpPayload>({
      invalidatesTags: ['Auth'],
      query: (body) => {
        return {
          url: `sign-up`,
          method: 'POST',
          body,
        };
      },
      transformResponse: (res: LoginResponse) => {
        toast.success(res.message);
        return res.data;
      },
    }),
    postLogin: build.mutation<PostLoginData, LoginPayload>({
      invalidatesTags: ['Auth'],
      query: (body) => {
        return {
          url: `login`,
          method: 'POST',
          body,
        };
      },
      transformResponse: (res: LoginResponse) => {
        toast.success(res.message);
        return res.data;
      },
    }),
    postSignUpWithGoogle: build.mutation<PostLoginData, SignUpWithGoogle>({
      invalidatesTags: ['Auth'],
      query: (body) => {
        return {
          url: `sign-up-google`,
          method: 'POST',
          body,
        };
      },
      transformResponse: (res: LoginResponse) => {
        toast.success(res.message);
        return res.data;
      },
    }),
  }),
});

export const { usePostSignUpMutation, usePostLoginMutation, usePostSignUpWithGoogleMutation } = authApi;
