import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  setIsAuthenticated,
  setIsLoading,
  setUser,
} from './../slices/userSlice.js';
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  tagTypes: ['User'],
  endpoints: builder => ({
    getProfile: builder.query({
      query: () => ({
        url: '/profile',
      }),
      transformResponse: res => res.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const user = await queryFulfilled;
          dispatch(setUser(user.data));
          dispatch(setIsAuthenticated(true));
          dispatch(setIsLoading(false));
        } catch (error) {
          dispatch(setIsLoading(false));
          console.log(error);
        }
      },
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation({
      query: body => ({
        url: '/update_profile',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    updatePassword: builder.mutation({
      query: body => ({
        url: '/update_password',
        method: 'PUT',
        body,
      }),
    }),
    uploadAvatar: builder.mutation({
      query: body => ({
        url: '/upload_avatar',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useUploadAvatarMutation,
} = userApi;
