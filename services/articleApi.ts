import { Api, createApi } from '@reduxjs/toolkit/query/react'
import {baseQuery} from './setting'

const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getLastestArticles: builder.query({
      query: ({
        page,
        pageSize
      }) => {
        return `articles?page=${page}&pageSize=${pageSize}`
      },
    }),
    getRecommendedArticles: builder.query({
      query: ({
        page,
        pageSize
      }) => {
        return `articles?page=${page}&pageSize=${pageSize}&isRecommended=true`
      },
    }),
    getArticleById: builder.query({
      query: ({
       id
      }) => {
        return `articles/${id}`
      },
    })
  }),
})
export default articleApi
export const {
  useGetLastestArticlesQuery,
  useGetRecommendedArticlesQuery,
  useGetArticleByIdQuery
} = articleApi


export const {
  getLastestArticles,
  getRecommendedArticles,
  getArticleById
} = articleApi.endpoints


