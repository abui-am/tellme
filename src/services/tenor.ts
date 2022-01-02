import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

import { TenorSearchResponse } from '@/typings/tenor';

const BASE_URL = 'https://g.tenor.com/v1';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: process.env.NEXT_PUBLIC_TENOR_API_KEY,
  },
});
export default {
  search: (config: AxiosRequestConfig<any>): AxiosPromise<TenorSearchResponse> => {
    return api.get('/search', config);
  },
};
