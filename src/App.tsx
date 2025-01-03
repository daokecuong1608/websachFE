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
import SachForm_Admin from './layout/admin/SachForm';
import Error403 from './layout/error/Error_403';
import HinhThucGiaoHang_Admin from './layout/admin/HinhThucGiaoHangForm';
import HinhThucThanhToan_Admin from './layout/admin/HinhThucThanhToanForm';
import TheLoai_Admin from './layout/admin/TheLoaiForm';
import CartPage from './layout/cart/CartPage';
import OrderDetailsPage from './layout/order/OrderDetailsPage';
import OrderConfirmationPage from './layout/order/OrderConfirmationPage ';
import OrderListPage from './layout/order/OrderListPage';
import OrderDetailPage from './layout/order/OrderDetailPage';
import ThongTinTaiKhoan from './layout/user/ThongTinTaiKhoan';
import Dashboard from './layout/admin/Dashboard';
import Error_401 from './layout/error/Error_401';
import Layout from './layout/admin/Layout';
import ThemHinhAnh_Admin from './layout/admin/ThemHinhAnh';
import Categories_Admin from './layout/admin/Categories';
import DeliveryMethods_Admin from './layout/admin/DeliveryMethods';
import PaymentMethods_Admin from './layout/admin/PaymentMethods';
import UpdateCategory_Admin from './layout/admin/UpdateCategory';
import UpdateDeliveryMethod_Admin from './layout/admin/UpdateDeliveryMethods';
import UpdatePaymentMethods_Admin from './layout/admin/UpdatePaymentMethods';
import Products_Admin from './layout/admin/Products';
import UpdateProduct from './layout/admin/UpdateProduct';
import UpdateProduct_Admin from './layout/admin/UpdateProduct';

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
          <Route path='/loi_403' element={<Error403 />} />
          <Route path='/401' element={<Error_401 />} />
          <Route path='/order-details' element={<OrderDetailsPage />} />
          <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />
          <Route path="/order-list" element={<OrderListPage />} />
          <Route path="/order-detail-page/:maDonhang" element={<OrderDetailPage />} />
          <Route path="/thongTinTaiKhoan" element={<ThongTinTaiKhoan />} />

          <Route path="/admin/dash-board" element={<Layout><Dashboard /></Layout>} />
          <Route path="/admin/categories" element={<Layout><Categories_Admin /></Layout>} />
          <Route path="/admin/delivery" element={<Layout><DeliveryMethods_Admin /></Layout>} />
          <Route path="/admin/payment" element={<Layout><PaymentMethods_Admin /></Layout>} />
          <Route path="/admin/products" element={<Layout><Products_Admin /></Layout>} />
          <Route path="/admin/update-category/:maTheLoai" element={<Layout><UpdateCategory_Admin /></Layout>} />
          <Route path="/admin/update-delivery/:maHinhThucGiaoHang" element={<Layout><UpdateDeliveryMethod_Admin /></Layout>} />
          <Route path="/admin/update-payment/:maHinhThucThanhToan" element={<Layout><UpdatePaymentMethods_Admin /></Layout>} />
          <Route path='/admin/themHinhThucGiaoHang' element={<Layout><HinhThucGiaoHang_Admin /></Layout>} />
          <Route path='/admin/themHinhThucThanhToan' element={<Layout><HinhThucThanhToan_Admin /></Layout>} />
          <Route path='/admin/theLoai' element={<Layout><TheLoai_Admin /></Layout>} />
          <Route path='/admin/themSach' element={<Layout><SachForm_Admin /></Layout>} />
          <Route path='/admin/themHinhAnh' element={<Layout><ThemHinhAnh_Admin /></Layout>} />
          <Route path='/admin/update-product/:maSach' element={<Layout><UpdateProduct_Admin /></Layout>} />


        </Routes>
        {/* chan Trang */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
