import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userApi } from './userApi.js';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  endpoints: builder => ({
    register: builder.mutation({
      query(body) {
        return {
          url: '/register',
          method: 'POST',
          body,
        };
      },
    }),
    login: builder.mutation({
      query(body) {
        return {
          url: '/login',
          method: 'POST',
          body,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getProfile.initiate(null));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    logout: builder.query({
      query: () => ({
        url: '/logout',
        method: 'GET',
      }),
    }),

    forgotPassword: builder.mutation({
      query: body => ({
        url: '/forgot_password',
        method: 'POST',
        body,
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ body, token }) => ({
        url: `/reset_password/${token}`,
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyLogoutQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
