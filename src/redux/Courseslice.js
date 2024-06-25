import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import env from '../../env';

export const fetchCourseData = createAsyncThunk(
    'course/fetchCourseData',
    async (courseId, thunkAPI) => {
      const response = await fetch(`${env.SERVER_URL}/fetch/courses/${courseId}`);
      const data = await response.json();
      return data;
    }
  );

const initialState = {
    course: {},  // State property for course data
    status: 'idle',  // State property for loading status
    error: null,  // State property for error messages
}

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourseData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.course = action.payload;
      })
      .addCase(fetchCourseData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
})

// Action creators are generated for each case reducer function
export const {  } = courseSlice.actions

export default courseSlice.reducer