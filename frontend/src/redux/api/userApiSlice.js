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
        })
    })
})

export const {useLoginMutation} = userApiSlice