// import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from "next-redux-wrapper"

// type Api = ReturnType<typeof createApi>;
interface Api {
  reducerPath: string,
  reducer: Function
}
export const getWrappedApiReducer = (api: Api)=> (state, action)=>{
  switch(action.type){
    case HYDRATE:
      return {
        ...state,
        ...action.payload[api.reducerPath]
      }
    default:
      return api.reducer(state, action)
  }
}

