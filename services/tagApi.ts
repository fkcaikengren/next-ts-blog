import { createApi } from '@reduxjs/toolkit/query/react'
import {baseQuery} from './setting'
const tagApi =  createApi({
  reducerPath: 'tagApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getTags: builder.query({
      query: () => `tags`,
    }),
  }),
})
export default tagApi
export const {
  useGetTagsQuery
} = tagApi

export const {
  getTags
} = tagApi.endpoints