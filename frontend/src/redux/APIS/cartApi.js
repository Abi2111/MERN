import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  tagTypes: ['cart'],
  endpoints: builder => ({
    addToCart: builder.mutation({
      query: ({ cartDetails, price }) => ({
        url: '/addcart',
        method: 'POST',
        body: { cartDetails, price },
      }),
      invalidatesTags: ['cart'],
    }),
    getCart: builder.query({
      query: () => ({
        url: '/getCart',
        method: 'GET',
      }),
      providesTags: ['cart'],
    }),
    updateQty: builder.mutation({
      query: body => ({
        url: '/updatecart',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['cart'],
    }),
    deleteCart: builder.mutation({
      query: body => ({
        url: '/deletecart',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['cart'],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetCartQuery,
  useUpdateQtyMutation,
  useDeleteCartMutation,
} = cartApi;
