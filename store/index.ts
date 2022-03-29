

import {configureStore,EnhancedStore,Store } from '@reduxjs/toolkit'
import { MakeStore, createWrapper, Context } from "next-redux-wrapper";
// import { rootReducer } from "./slices";
import categoryApi from './../services/categoryApi';
import tagApi from './../services/tagApi';
import articleApi from "services/articleApi";
import { getWrappedApiReducer } from "utils/reduxTool";


// IStoreState
export const makeStore : MakeStore = (context: Context) =>{
  // const composeEnhancers =  ( typeof window !== 'undefined' 
  //   && typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === "function" 
  //   && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) 
  //   || compose;
  return configureStore({
    reducer: {
      [articleApi.reducerPath]: getWrappedApiReducer(articleApi),
      [categoryApi.reducerPath]:getWrappedApiReducer(categoryApi),
      [tagApi.reducerPath]: getWrappedApiReducer(tagApi)
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([articleApi.middleware,categoryApi.middleware,tagApi.middleware]),
  })
}
export const wrapper = createWrapper(makeStore, { debug: false });
