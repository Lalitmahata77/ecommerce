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
        })
    })
})

export const {useLoginMutation,useLogoutMutation,useRegisterMutation,useUpdateUserMutation} = userApiSlice