import React from "react";
import { Link } from "react-router-dom";
import './css/Sidebar.css';

const Sidebar: React.FC = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Link to="/admin/dash-board" className="dashboard-link">
                        <button>Dashboard</button>
                    </Link>
                </li>
                <li>
                    <div className="menu-item">
                        <button>Quản lý thể loại</button>
                        <ul className="submenu">
                            <li><Link to="/admin/categories">Xem chi tiết</Link></li>
                            <li><Link to="/admin/theLoai">Thêm thể loại</Link></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div className="menu-item">
                        <button>Quản lý hình thức giao hàng</button>
                        <ul className="submenu">
                            <li><Link to="/admin/delivery">Xem chi tiết</Link></li>
                            <li><Link to="/admin/themHinhThucGiaoHang">Thêm hình thức</Link></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div className="menu-item">
                        <button>Quản lý hình thức thanh toán</button>
                        <ul className="submenu">
                            <li><Link to="/admin/payment">Xem chi tiết </Link></li>
                            <li><Link to="/admin/themHinhThucThanhToan">Thêm hình thức</Link></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div className="menu-item">
                        <button>Quản lý sản phẩm</button>
                        <ul className="submenu">
                            <li><Link to="/admin/products">Xem chi tiết sản phẩmp</Link></li>
                            <li><Link to="/admin/themSach">Thêm sản phẩm</Link></li>
                        </ul>
                    </div>
                </li>

                <li>
                    <div className="menu-item">
                        <button>Quản lý hình ảnh</button>
                        <ul className="submenu">
                            <li><Link to="/admin/hinh-anh">Xem chi tiết hình ảnh</Link></li>
                            <li><Link to="/admin/themHinhAnh">Thêm hình ảnh</Link></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div className="menu-item">
                        <button><Link to="/admin/order">Quản lý đơn hàng</Link></button>
                    </div>
                </li>


            </ul>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Sidebar;
