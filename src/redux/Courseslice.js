import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import env from '../../env';

export const fetchCourseData = createAsyncThunk(
  'course/fetchCourseData',
  async (courseId, thunkAPI) => {
    const response = await fetch(`${env.SERVER_URL}/fetch/course/${courseId}`);
    const data = await response.json();
    return data;
  }
);

export const fetchLessonData = createAsyncThunk(
  'course/fetchLessonData',
  async (lessonId, thunkAPI) => {
    const response = await fetch(`${env.SERVER_URL}/lesson/preview/${lessonId}`);
    const data = await response.json();
    return data;
  }
);

const initialState = {
  course: {}, // State property for course data
  courseStatus: 'idle', // State property for course loading status
  courseError: null, // State property for course error messages
  currentLesson: {}, // State property for current lesson data
  lessonStatus: 'idle', // State property for lesson loading status
  lessonError: null, // State property for lesson error messages
};

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Course data fetching reducers
      .addCase(fetchCourseData.pending, (state) => {
        state.courseStatus = 'loading';
      })
      .addCase(fetchCourseData.fulfilled, (state, action) => {
        state.courseStatus = 'succeeded';
        state.course = action.payload;
      })
      .addCase(fetchCourseData.rejected, (state, action) => {
        state.courseStatus = 'failed';
        state.courseError = action.error.message;
      })
      // Lesson data fetching reducers
      .addCase(fetchLessonData.pending, (state) => {
        state.lessonStatus = 'loading';
      })
      .addCase(fetchLessonData.fulfilled, (state, action) => {
        state.lessonStatus = 'succeeded';
        state.currentLesson = action.payload;
      })
      .addCase(fetchLessonData.rejected, (state, action) => {
        state.lessonStatus = 'failed';
        state.lessonError = action.error.message;
      });
  },
});

export const {} = courseSlice.actions;

export default courseSlice.reducer;
