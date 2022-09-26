import React, { useEffect } from 'react';
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
import agent from './actions/agent';
import { useAppDispatch } from './redux/store/ConfigureStore';
import { setBasket } from './redux/slice/basketSlice';
import Dashboard from './pages/Dashboard';

function App() {
  const dispatch = useAppDispatch();
  function getCookie(name: string) {
    return (
      document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() ||
      ''
    );
  }

  useEffect(() => {
    const clientId = getCookie('clientId');
    if (clientId) {
      agent.Baskets.get()
        .then((basket) => dispatch(setBasket(basket)))
        .catch((error) => console.log(error));
    }
  }, [dispatch]);
  
  return (<>
    <Navigation/>

    <Routes>
      <Route path='/' element={<Categories/>}/>
    </Routes>
    
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path="/course/:id" element={<DescriptionPage/>}/>
      <Route path="/category/:id" element={<CategoryPage/>}/>
      <Route path="/basket" element={<BasketPage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/detail" element={<Detailpage/>}/>
      <Route path="/profile" element={<Dashboard/>}/>
    </Routes>
  </>);
}

export default App;
