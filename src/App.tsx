import React, { useState } from 'react';
import './App.css';
import Navbar from './layout/header-footer/Navbar';
import Footer from './layout/header-footer/Footer';
import HomePage from './layout/homepage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './layout/about/About';

function App() {

  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');

  return (
    <div className="App">
      <BrowserRouter>
        {/* thanh dieu huong */}
        <Navbar
          tuKhoaTimKiem={tuKhoaTimKiem}
          setTuKhoaTimKiem={setTuKhoaTimKiem}
        />
        <Routes>

          <Route path='/' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
          <Route path='/:maTheLoai' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
          <Route path='/about' element={<About />} />

        </Routes>
        {/* chan Trang */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
