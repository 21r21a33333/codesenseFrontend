import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseData } from '../../redux/Courseslice';
import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';

const CoursePage = () => {
  let { courseid:courseId } = useParams();
  const dispatch = useDispatch();
  // side bar and content data
  const course = useSelector((state) => state.course.course);
  const status = useSelector((state) => state.course.status);
  const error = useSelector((state) => state.course.error);

  useEffect(() => {
    dispatch(fetchCourseData(courseId));
  }, [courseId, dispatch]);

  

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Sidebar/>
      <Outlet />
    </div>
  );
};

export default CoursePage;
