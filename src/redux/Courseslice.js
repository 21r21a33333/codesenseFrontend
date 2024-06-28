import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import env from '../../env';
import jwtToken from '../helper/jwtToken';

export const fetchCourseData = createAsyncThunk(
  'course/fetchCourseData',
  async (courseId, thunkAPI) => {
    const response = await fetch(`${env.SERVER_URL}/fetch/course/${courseId}`);
    const data = await response.json();
    const responseProgress = await fetch(`${env.SERVER_URL}/fetch/progress/${courseId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwtToken()}`, // Replace `authToken` with your actual token variable
        'Content-Type': 'application/json' // Include this if you expect JSON response
      }
    });
    const ProgressData = await responseProgress.json();
    return { data, ProgressData };
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
  reducers: {
    Toggle: (state, action) => {
      let {moduleid,lessonid}=action.payload;
      let course=state.course;
      course.modules.map((module)=>{
        if(module._id===moduleid){
          module.lessons.map((lesson)=>{
            if(lesson._id===lessonid){
              lesson.completed=true;
              state.course=course;
              console.log(state.course);
              return;
            }
          })
        }
      });
    }
  },
  extraReducers: (builder) => {
    builder
      // Course data fetching reducers
      .addCase(fetchCourseData.pending, (state) => {
        state.courseStatus = 'loading';
      })
      .addCase(fetchCourseData.fulfilled, (state, action) => {
        state.course = action.payload.data;

        let progressData = action.payload.ProgressData;
        for (const moduleProgress of progressData.progress) {
          // Find the corresponding module in the course data
          const module = state.course.modules.find(m => m._id === moduleProgress.moduleid);
          if (module) {
            // For each lesson in the module progress, find the corresponding lesson in the module's lessons
            for (const lessonProgress of moduleProgress.lessons) {
              const lesson = module.lessons.find(l => l._id === lessonProgress.lessonid);
              if (lesson) {
                // Mark the lesson as completed
                lesson.completed = true;
              }
            }
          }
        }


        console.log(state.course);

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

export const { addProgress,Toggle } = courseSlice.actions;

export default courseSlice.reducer;
