import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { cartApi } from './cartApi.js';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  tagTypes: ['CREATED', 'CART'],
  endpoints: builder => ({
    newOrder: builder.mutation({
      query: body => ({
        url: '/new/order',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['CREATED', 'CART'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          console.log(queryFulfilled);
          await dispatch(cartApi.endpoints.getCart.initiate());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getUserOrders: builder.query({
      query: () => ({
        url: '/user/orders',
      }),
      providesTags: ['CREATED'],
    }),
    getOrderDetails: builder.query({
      query: id => ({
        url: `/orders/${id}`,
      }),
      providesTags: ['CREATED'],
    }),
  }),
});

export const {
  useNewOrderMutation,
  useGetUserOrdersQuery,
  useGetOrderDetailsQuery,
} = orderApi;
