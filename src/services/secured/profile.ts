import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import { ProfileStored } from '@/typings/profile';

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
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult: any = await baseQueryToken('/token', api, extraOptions);
    if (refreshResult.data) {
      // store the new token
      const auth = JSON.parse(window.localStorage.getItem('auth') ?? '');
      auth.refreshToken = refreshResult?.data?.refresh_token;
      auth.token = refreshResult?.data?.id_token;
      localStorage.setItem('auth', auth);
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
  tagTypes: ['SecuredProfile'],
  reducerPath: 'securedProfileApi',
  endpoints: (build) => ({
    getMyself: build.query<ProfileStored, any>({
      query: () => ({
        url: `profile/me`,
        method: 'GET',
      }),
      providesTags: () => [{ type: 'SecuredProfile' }],
      transformResponse: (res: any) => {
        return res.data;
      },
    }),
  }),
});

export const { useGetMyselfQuery } = securedProfileApi;
