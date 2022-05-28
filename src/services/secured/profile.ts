import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import toast from 'react-hot-toast';

import {
  CommentPayload,
  DataUploadProfileResponse,
  Posts,
  UploadProfilePayload,
  UploadProfileResponse,
} from '@/typings/posts';
import { ProfileStored, ProfileStoredResponse, PutProfileByIdPayload } from '@/typings/profile';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/v1',
});

const baseQueryToken = fetchBaseQuery({
  baseUrl: 'https://securetoken.googleapis.com/v1',
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let newArgs: string | FetchArgs = '';
  if (typeof args === 'string') {
    newArgs = args;
  } else {
    newArgs = {
      headers: {
        authentication: JSON.parse(localStorage.getItem('auth') ?? '').token,
      },
      ...args,
    };
  }
  let result = await baseQuery(newArgs, api, extraOptions);
  if (result.error && (result.error.data as any)?.code === 'auth/id-token-expired') {
    // try to get a new token
    const refreshResult: any = await baseQueryToken(
      {
        url: '/token',
        method: 'POST',
        params: { key: process.env.NEXT_PUBLIC_FIREBASE_API_KEY },
        body: {
          grant_type: 'refresh_token',
          refresh_token: JSON.parse(localStorage.getItem('auth') ?? '').refreshToken,
        },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // store the new token
      const auth = JSON.parse(window.localStorage.getItem('auth') ?? '');
      auth.refreshToken = refreshResult?.data?.refresh_token;
      auth.token = refreshResult?.data?.id_token;
      localStorage.setItem('auth', JSON.stringify(auth));
      // retry the initial query
      result = await baseQuery(newArgs, api, extraOptions);
    } else {
      //   api.dispatch(loggedOut());
    }
  }

  return result;
};

// profile
export const securedProfileApi = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['SecuredProfile', 'ProfilePost', 'Profile'],
  reducerPath: 'securedProfileApi',
  endpoints: (build) => ({
    getMyself: build.query<ProfileStored, any>({
      query: () => ({
        url: `profile/me`,
        method: 'GET',
      }),
      providesTags: () => ['SecuredProfile'],
      transformResponse: (res: any) => {
        return res.data;
      },
    }),
    postCommentAsAuthor: build.mutation<Posts, CommentPayload>({
      invalidatesTags: ['ProfilePost'],
      query: ({ comment, postId }) => {
        return {
          url: `posts/${postId}/comment-as-author`,
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
    putProfileById: build.mutation<
      ProfileStored,
      {
        id: string;
        data: Partial<PutProfileByIdPayload>;
      }
    >({
      invalidatesTags: () => ['SecuredProfile'],
      query: ({ id, data }) => {
        return {
          url: `profile/${id}`,
          method: 'PUT',
          body: data,
        };
      },
      transformResponse: (res: ProfileStoredResponse) => {
        toast.success(res?.message);
        return res?.data;
      },
    }),
    uploadProfile: build.mutation<DataUploadProfileResponse, UploadProfilePayload>({
      query: ({ file }) => {
        const formData = new FormData();
        formData.append('file', file);
        return {
          url: `storage/upload-profile-image`,
          method: 'POST',
          body: formData,
        };
      },
      transformResponse: (res: UploadProfileResponse) => {
        return res.data;
      },
    }),
    uploadProfileCover: build.mutation<DataUploadProfileResponse, UploadProfilePayload>({
      query: ({ file }) => {
        const formData = new FormData();
        formData.append('file', file);
        return {
          url: `storage/upload-profile-cover`,
          method: 'POST',
          body: formData,
        };
      },
      transformResponse: (res: UploadProfileResponse) => {
        return res.data;
      },
    }),
  }),
});

export const {
  useGetMyselfQuery,
  useUploadProfileMutation,
  useUploadProfileCoverMutation,
  usePostCommentAsAuthorMutation,
  usePutProfileByIdMutation,
} = securedProfileApi;
