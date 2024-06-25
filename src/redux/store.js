import { configureStore } from '@reduxjs/toolkit'
import courseReducer from './Courseslice'

export const store = configureStore({
  reducer: {
    course:courseReducer,
  },
})