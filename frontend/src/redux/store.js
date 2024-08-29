import {configureStore} from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice"
import { setupListeners } from "@reduxjs/toolkit/query/react"
import authReducer from "./feature/auth/authSlice"
export const store = configureStore({
    reducer : {
        auth : authReducer,
        [apiSlice.reducerPath] : apiSlice.reducer,
        
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools : true

})

setupListeners(store.dispatch)
export default store