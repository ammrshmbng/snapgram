import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PostElement } from '@/types';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('apiKey', API_KEY);
      // Asumsikan token disimpan di localStorage
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getRecentPosts: builder.query<PostElement[], void>({
      query: () => 'api/v1/explore-post?size=6&page=3',
    }),
    getPosts: builder.query<PostElement[], { page: number, size: number }>({
      query: ({ page, size }) => `api/v1/explore-post?size=${size}&page=${page}`,
    }),
  }),
});

export const { useGetRecentPostsQuery, useGetPostsQuery } = postApi;
