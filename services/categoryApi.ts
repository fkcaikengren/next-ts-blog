import { createApi } from '@reduxjs/toolkit/query/react'
import {baseQuery} from './setting'

const categoryApi =  createApi({
  reducerPath: 'categoryApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => {
        return `categories`
      },
    }),
  }),
})
export default categoryApi
export const {
  useGetCategoriesQuery
} = categoryApi


export const {
  getCategories
} = categoryApi.endpoints