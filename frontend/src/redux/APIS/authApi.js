import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  endpoints: builder => ({
    login: builder.mutation({
      query: body => ({
        url: '/login',
        method: 'POST',
        body,
        headers: { 'Content-type': 'application/json' },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data: login } = await queryFulfilled;
          // dispatch(userApi.endpoints);
          console.log(login);
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = userApi;
