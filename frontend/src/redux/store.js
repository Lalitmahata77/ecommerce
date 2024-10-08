import {configureStore} from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice"
import { setupListeners } from "@reduxjs/toolkit/query/react"
import authReducer from "./feature/auth/authSlice"
import shopReducer from "../redux/feature/shop/shopSlice";
import favoritesReducer from "../redux/feature/favorites/favoriteSlice"
import cartSliceReducer from "../redux/feature/cart/cartSlice"
export const store = configureStore({
    reducer : {
        auth : authReducer,
        [apiSlice.reducerPath] : apiSlice.reducer,
        shop: shopReducer,
        favorites: favoritesReducer,
        cart: cartSliceReducer,
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools : true

})

setupListeners(store.dispatch)
export default store