import React, { useCallback, useEffect, useState } from 'react';
import {Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Detailpage from './pages/DetailPage';
import Homepage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import "antd/dist/antd.min.css";
import CategoryPage from './pages/CategoryPage';
import DescriptionPage from './pages/DescriptionPage';
import BasketPage from './pages/BasketPage';
import { useAppDispatch, useAppSelector } from './redux/store/ConfigureStore';
import { fetchBasketAsync } from './redux/slice/basketSlice';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute, { ProtectedRouteProps } from './components/PrivateRoute';
import CheckoutPage from './pages/CheckoutPage';
import { fetchCurrentUser } from './redux/slice/userSlice';
import CoursePage from './pages/CoursePage';
import Loading from './components/Loading';
import InstructorPage from './pages/InstructorPage';
import CreateCoursePage from './pages/CreateCoursePage';
import { getCategoriesAsync } from './redux/slice/categorySlice';
import SectionPage from './pages/SectionPage';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  const appInit = useCallback(
    async () => {
        try {
          await dispatch(fetchBasketAsync());
          await dispatch(fetchCurrentUser());
          await dispatch(getCategoriesAsync());
        } catch (error) {
          console.log(error);
          
        }
      
    },
    [dispatch],
  )
  
  const {user} = useAppSelector((state) => state.user);

  useEffect(() => {
    appInit().then(() => setLoading(false));
  }, [dispatch]);

  if(loading) return <Loading/>

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    isAuthenticated: user ? true : false,
    authenticationPath: '/login',
  };
  
  return (<>
    <Navigation/>

   
    
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path="/course/:id" element={<DescriptionPage/>}/>
      <Route path="/category/:id" element={<CategoryPage/>}/>
      <Route path="/basket" element={<BasketPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/detail" element={<Detailpage/>}/>

      <Route path="/profile" element={<PrivateRoute {...defaultProtectedRouteProps} outlet={<DashboardPage/>}/>}/>
      <Route path="/learn/:course/:lecture" element={<PrivateRoute {...defaultProtectedRouteProps} outlet={<CoursePage/>}/>}/>
      <Route path="/checkout" element={<PrivateRoute {...defaultProtectedRouteProps} outlet={<CheckoutPage/>}/>}/>
      <Route path="/instructor" element={<PrivateRoute {...defaultProtectedRouteProps} outlet={<InstructorPage/>}/>}/>
      <Route path="/instructor/course" element={<PrivateRoute {...defaultProtectedRouteProps} outlet={<CreateCoursePage/>}/>}/>
      <Route path="/:course/lectures" element={<PrivateRoute {...defaultProtectedRouteProps} outlet={<SectionPage/>}/>}/>
    </Routes>
  </>);
}

export default App;
