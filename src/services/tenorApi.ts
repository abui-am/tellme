import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { TenorCategoryResponse, TenorSearchResponse } from '@/typings/tenor';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://g.tenor.com/v1',
});

const BASE = { key: process.env.NEXT_PUBLIC_TENOR_API_KEY };

export const tenorApi = createApi({
  baseQuery,
  reducerPath: 'tenorApi',
  tagTypes: ['Tenor', 'TenorSearch'],
  endpoints: (build) => ({
    search: build.mutation<TenorSearchResponse, Record<any, any>>({
      query: (props) => ({
        url: '/search',
        method: 'GET',
        params: { ...BASE, limit: 10, ...props },
      }),
    }),
    categories: build.query<TenorCategoryResponse, any>({
      providesTags: () => ['Tenor'],
      query: () => ({
        url: '/categories',
        method: 'GET',
        params: { ...BASE },
      }),
    }),
  }),
});

export const { useSearchMutation, useCategoriesQuery } = tenorApi;
