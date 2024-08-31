import { USER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints :(builder) =>({
        login : builder.mutation({
            query : (data)=>({
                url : `${USER_URL}/login`,
                method : "POST",
                body : data
            })
        }),
        logout : builder.mutation({
            query : () =>({
                url : `${USER_URL}/logout`,
                method : "POST"
            })
        }),
        register : builder.mutation({
            query : (data)=>({
                url : `${USER_URL}/register`,
                method : "POST",
                body : data
            })
        }),
        updateUser : builder.mutation({
            query : (data)=>({
                url : `${USER_URL}/updateUser`,
                method : "PUT",
                body : data
            })
        }),
        getAllUser : builder.query({
            query : ()=>({
                url : `${USER_URL}/getAll`,
            
            }),
            providesTags : ["User"],
            keepUnusedDataFor: 5,
            
        }),
        deleteUser : builder.mutation({
            query : (userId) =>({
                url : `${USER_URL}/${userId}`,
                method : "DELETE"
            })
        }),
        getUserDetails : builder.query({
            query : (id) =>({
                url : `${USER_URL}/me/${id}`,
                method : "GET"
            }),
            keepUnusedDataFor : 5,
        }),
        updateUserByAdmin : builder.mutation({
            query : (data) =>({
                url : `${USER_URL}/updateUser/admin/${data.userInfo}`
            })
        })

    })
})

export const {useLoginMutation,useLogoutMutation,useRegisterMutation,useUpdateUserMutation,useGetAllUserQuery,useDeleteUserMutation,useGetUserDetailsQuery,useUpdateUserByAdminMutation} = userApiSlice