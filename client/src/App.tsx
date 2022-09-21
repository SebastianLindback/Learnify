import React from 'react';
import {Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Categories from './components/Categories';
import Detailpage from './pages/DetailPage';
import Homepage from './pages/HomePage';
import Login from './pages/Login';
import "antd/dist/antd.min.css";
import CategoryPage from './pages/CategoryPage';

function App() {
  return (<>
    <Navigation/>
    <Routes>
    <Route path='/' element={<Categories/>}/>
    </Routes>
    <Routes>
      
      <Route path='/' element={<Homepage/>}/>
      
      
      <Route path="/category/:id" element={<CategoryPage/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/detail" element={<Detailpage/>}></Route>
    </Routes>
  </>);
}

export default App;
