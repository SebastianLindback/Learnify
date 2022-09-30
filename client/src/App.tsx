import React, { useCallback, useEffect, useState } from 'react';
import {Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Categories from './components/Categories';
import Detailpage from './pages/DetailPage';
import Homepage from './pages/HomePage';
import Login from './pages/Login';
import "antd/dist/antd.min.css";
import CategoryPage from './pages/CategoryPage';
import DescriptionPage from './pages/DescriptionPage';
import BasketPage from './pages/BasketPage';
import { useAppDispatch, useAppSelector } from './redux/store/ConfigureStore';
import { fetchBasketAsync, setBasket } from './redux/slice/basketSlice';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute, { ProtectedRouteProps } from './components/PrivateRoute';
import CheckoutPage from './pages/CheckoutPage';
import { fetchCurrentUser } from './redux/slice/userSlice';
import Loading from './components/loading';
import CoursePage from './pages/CoursePage';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  const appInit = useCallback(
    async () => {
        try {
          await dispatch(fetchBasketAsync());
          await dispatch(fetchCurrentUser());
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
      <Route path="/login" element={<Login/>}/>
      <Route path="/detail" element={<Detailpage/>}/>
      <Route path="/profile" element={<PrivateRoute {...defaultProtectedRouteProps} outlet={<DashboardPage/>}/>}/>
      <Route path="/learn/:course/:lecture" element={<PrivateRoute {...defaultProtectedRouteProps} outlet={<CoursePage/>}/>}/>
      <Route path="/checkout" element={<PrivateRoute {...defaultProtectedRouteProps} outlet={<CheckoutPage/>}/>}/>
    </Routes>
  </>);
}

export default App;
