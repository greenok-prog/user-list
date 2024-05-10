import { IUser } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({ url: `/users` }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: IUser) => ({
                type: "Users" as const,
                id,
              })),
              { type: "Users", id: "LIST" },
            ]
          : { type: "Users", id: "LIST" },
    }),
    createUser: builder.mutation({
      query: (user: IUser) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    removeUser: builder.mutation({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: ({ id, user }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    getUser: builder.query({
      query: (id: string) => ({ url: `/users/${id}` }),
    }),
  }),
});
export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useRemoveUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} = usersApi;
