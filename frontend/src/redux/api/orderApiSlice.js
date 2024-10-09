import {PAYPAL_URL,ORDER_URL} from "../constants"
import {apiSlice}  from "./apiSlice"

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder)=>({
        createOrder : builder.mutation({
            query : (order)=>({
                url : `${ORDER_URL}/createPost`,
                method : "POST",
                data : order
            })
        }),
        getOrderDetails : builder.query({
            query : (id) =>({
                url : `${ORDER_URL}/${id}`,
                method : "get"
            })
        }),
        payOrder : builder.mutation({
            query : ({orderId, details})=>({
                url : `${ORDER_URL}/${orderId}`,
                method : "PUT",
                data : details
            })
        }),
        getPaypalClientId : builder.query({
            query : ()=>({
                url : PAYPAL_URL
            })
        }),
        getMyOrders : builder.query({
            query : ()=>({
                url : ORDER_URL
            })
        }),
        getOrders: builder.query({
            query: () => ({
              url: ORDER_URL,
            }),
          }),
        deliverOrder: builder.mutation({
            query: (orderId) => ({
              url: `${ORDER_URL}/${orderId}/deliver`,
              method: "PUT",
            }),
          }),
      
          getTotalOrders: builder.query({
            query: () => `${ORDER_URL}/total-orders`,
          }),
      
          getTotalSales: builder.query({
            query: () => `${ORDER_URL}/total-sales`,
          }),
      
          getTotalSalesByDate: builder.query({
            query: () => `${ORDER_URL}/total-sales-by-date`,
          }),
    })
})

export const {
    useGetTotalOrdersQuery,
    useGetTotalSalesQuery,
    useGetTotalSalesByDateQuery,
    // ------------------
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetPaypalClientIdQuery,
    useGetMyOrdersQuery,
    useDeliverOrderMutation,
    useGetOrdersQuery,
  } = orderApiSlice;