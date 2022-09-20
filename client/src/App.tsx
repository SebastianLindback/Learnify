import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Category from './components/Categories';
import Detailpage from './pages/DetailPage';
import Homepage from './pages/HomePage';
import Login from './pages/Login';
import "antd/dist/antd.min.css";

function App() {
  return (<>
    <Navigation></Navigation>
    <Routes>
    <Route path="/" element={<Category/>}></Route>
    </Routes>
    
    <Routes>
      
      <Route path="/" element={<Homepage/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/detail" element={<Detailpage/>}></Route>
    </Routes>
  </>);
}

export default App;
