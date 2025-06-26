import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/shared/services/base-query";
import { IUser } from "@/shared/interface/user.interface";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["User"],

  endpoints: (builder) => ({
    getAllUsers: builder.query<IUser[], void>({
      query: () => "/user",
      providesTags: ["User"],
    }),

    getUserByUID: builder.query<IUser, string>({
      query: (uid) => `/user/${uid}`,
    }),

    updateUserRole: builder.mutation<
      IUser,
      { uid: string; role: "user" | "admin" }
    >({
      query: ({ uid, role }) => ({
        url: `/user/${uid}`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation<{ message: string }, string>({
      query: (uid) => ({
        url: `/user/${uid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByUIDQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} = userApi;
