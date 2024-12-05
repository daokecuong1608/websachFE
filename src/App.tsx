import React, { useState } from 'react';
import './App.css';
import Navbar from './layout/header-footer/Navbar';
import Footer from './layout/header-footer/Footer';
import HomePage from './layout/homepage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './layout/about/About';
import ChiTietSanPham from './layout/product/ChiTietSanPham';
import DangKyNguoiDung from './layout/user/DangKyNguoiDung';
import KichHoatTaiKhoan from './layout/user/KichHoatTaiKhoan';
import DangNhap from './layout/user/DangNhap';
import Test from './layout/user/Test';
import SachForm from './layout/admin/SachForm';
import SachForm_Admin from './layout/admin/SachForm';
import Error403 from './layout/error/Error_403';
import HinhThucGiaoHang_Admin from './layout/admin/HinhThucGiaoHangForm';
import HinhThucThanhToan_Admin from './layout/admin/HinhThucThanhToanForm';
import TheLoai_Admin from './layout/admin/TheLoaiForm';
import CartPage from './layout/cart/CartPage';

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
          <Route path="/gio-hang" element={<CartPage />} />
          <Route path='/' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
          <Route path='/:maTheLoai' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
          <Route path='/about' element={<About />} />
          <Route path='/sach/:maSach' element={<ChiTietSanPham />} />
          <Route path='/dangKy' element={<DangKyNguoiDung />} />
          <Route path='/kichHoat/:email/:maKichHoat' element={<KichHoatTaiKhoan />} />
          <Route path='/dangNhap' element={<DangNhap />} />
          <Route path='/test' element={<Test />} />
          <Route path='/admin/themSach' element={<SachForm_Admin />} />
          <Route path='/loi_403' element={<Error403 />} />
          <Route path='/admin/themHinhThucGiaoHang' element={<HinhThucGiaoHang_Admin />} />
          <Route path='/admin/themHinhThucThanhToan' element={<HinhThucThanhToan_Admin />} />
          <Route path='/admin/theLoai' element={<TheLoai_Admin />} />

        </Routes>
        {/* chan Trang */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
