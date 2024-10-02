import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";

 export const categoryApiSlice = apiSlice.injectEndpoints({
endpoints : (builder) =>({
createCategory : builder.mutation({
    query : (newCategory)=>({
        url : `${CATEGORY_URL}`,
        method : "POST",
        body : newCategory
    })
}),
uodateCategory :builder.mutation ({
   query : ({categoryId,upadtedCategory})=>({
    url : `${CATEGORY_URL}/${categoryId}`,
    method : "PUT",
    body : upadtedCategory
   })
}),
deleteCategory : builder.mutation({
    query : (categoryId)=>({
        url : `${CATEGORY_URL}/${categoryId}`,
        method : "DELETE"
    })
}),
fetchCategories: builder.query({
    query: () => `${CATEGORY_URL}/categories`,
  }),
readCategory : builder.query({
    query : (categoryId)=>({
        url : `${CATEGORY_URL}/${categoryId}`
    })
})
})
})


export const {useCreateCategoryMutation,useUodateCategoryMutation,useDeleteCategoryMutation,useFetchCategoriesQuery,useReadCategoryQuery} = categoryApiSlice