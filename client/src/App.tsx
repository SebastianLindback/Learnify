import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Detailpage from './pages/DetailPage';
import Homepage from './pages/HomePage';
import Login from './pages/Login';

function App() {
  return (<>
    <Navigation></Navigation>
    <Routes>
      <Route path="/" element={<Homepage/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/detail" element={<Detailpage/>}></Route>
    </Routes>
  </>);
}

export default App;
