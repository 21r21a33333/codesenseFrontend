import { configureStore } from '@reduxjs/toolkit'
import courseReducer from './Courseslice'
import ideReducer from "./ide"
export const store = configureStore({
  reducer: {
    course:courseReducer,
    ide: ideReducer,
  },
})