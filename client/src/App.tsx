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
import { useStoreContext } from './context/StoreContext';
import agent from './actions/agent';

function App() {
  const { setBasket } = useStoreContext();

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
        .then((basket) => setBasket(basket))
        .catch((error) => console.log(error));
    }
  }, [setBasket]);
  
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
    </Routes>
  </>);
}

export default App;
