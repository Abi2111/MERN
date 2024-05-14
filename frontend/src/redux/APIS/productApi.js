import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  keepUnusedDataFor: 60,
  tagTypes: ['ProductAdded'],
  endpoints: builder => ({
    getProducts: builder.query({
      query: params => ({
        url: '/products',
        params: {
          search: params?.search,
          category: params?.category,
          page: params?.page,
        },
        method: 'GET',
        headers: { 'Content-type': 'application/json' },
      }),
    }),
    getProductDetails: builder.query({
      query: id => ({
        url: `/product/${id}`,
      }),
      providesTags: ['ProductAdded'],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productApi;
