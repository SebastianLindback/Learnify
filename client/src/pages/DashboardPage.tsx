import { Row } from 'antd';
import React, { useEffect } from 'react'
import ShowCourses from '../components/ShowCourses';
import { Course } from '../models/course';
import { fetchCurrentUser } from '../redux/slice/userSlice';
import { useAppDispatch, useAppSelector } from '../redux/store/ConfigureStore';

function DashboardPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const { userCourses } = useAppSelector((state) => state.user);
  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1>My Courses</h1>
      </div>
      <div className="dashboard__courses">
        <Row gutter={[48, 32]}>
          {userCourses.length > 0 ? (
            userCourses.map((course: Course, index: number) => {
              return <ShowCourses key={index} course={course} />;
            })
          ) : (
            <h1>You have not bought any courses!</h1>
          )}
        </Row>
      </div>
    </div>
  );
};

export default DashboardPage