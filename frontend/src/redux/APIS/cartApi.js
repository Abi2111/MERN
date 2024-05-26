import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  tagTypes: ['CART'],
  endpoints: builder => ({
    addToCart: builder.mutation({
      query: ({ cartDetails, price }) => ({
        url: '/addcart',
        method: 'POST',
        body: { cartDetails, price },
      }),
      invalidatesTags: ['CART'],
    }),
    getCart: builder.query({
      query: () => ({
        url: '/getCart',
        method: 'GET',
      }),
      providesTags: ['CART'],
    }),
    updateQty: builder.mutation({
      query: body => ({
        url: '/updatecart',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['CART'],
    }),
    deleteCart: builder.mutation({
      query: body => ({
        url: '/deletecart',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['CART'],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetCartQuery,
  useUpdateQtyMutation,
  useDeleteCartMutation,
} = cartApi;
