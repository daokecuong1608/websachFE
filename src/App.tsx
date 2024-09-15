import React from 'react';
import './App.css';
import Navbar from './layout/header-footer/Navbar';
import Footer from './layout/header-footer/Footer';
import HomePage from './layout/homepage/HomePage';
import DanhSachSanPham from './layout/product/DanhSachSanPham';

function App() {


  return (
    <div className="App">
      {/* thanh dieu huong */}
      <Navbar />

      <HomePage />
      <DanhSachSanPham />
      {/* chan Trang */}
      <Footer />
    </div>
  );
}

export default App;
