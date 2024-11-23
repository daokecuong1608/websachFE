import { ChangeEvent, useEffect, useState } from "react";
import { Search } from "react-bootstrap-icons";
import { Link, NavLink, useNavigate } from "react-router-dom";

interface NavbarProps {
    tuKhoaTimKiem: string
    setTuKhoaTimKiem: (tuKhoa: string) => void;
}

function Navbar({ tuKhoaTimKiem, setTuKhoaTimKiem }: NavbarProps) {

    const navigate = useNavigate();
    const [tuKhoaTamThoi, setTuKhoaTamthoi] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');


    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('username');
        if (token && user) {
            setIsLoggedIn(true);
            setUserName(user);
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        setUserName('');
        navigate('/dangNhap');
    }

    //khi nhap ND vao o tim kiem 
    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTuKhoaTamthoi(e.target.value);
    }

    //khi click vao nut tim kiem 
    const handleSearch = () => {
        setTuKhoaTimKiem(tuKhoaTamThoi);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container-fluid">
                <a className='navbar-brand' href='/'>BookStore</a>
                <button className='navbar-toggler' type="button"
                    data-bs-toggle="collapse" data-bs-target="#navbarSupportContent"
                    aria-controls="navbarSupportContent" aria-expanded="false" aria-label="Toggle navigation" >
                    <span className='navbar-toggler-icon'></span>
                </button>


                <div className="collapse navbar-collapse"
                    id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link activ" aria-current="page" to="/" >
                                Trang chủ
                            </NavLink>
                        </li>

                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle"
                                to="#" id="navbarDropdown_1"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Thể loại sách
                            </NavLink>
                            <ul className="dropdown-menu"
                                aria-labelledby="navbarDropdown_1">
                                <li>
                                    <NavLink className="dropdown-item" to="/1">
                                        Thể loại 1
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="dropdown-item" to="/2">
                                        Thể loại 2
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="dropdown-item" to="/3">
                                        Thể loại 3
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle"
                                href="#" id="navbarDropdown_2"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Quy định bán hàng
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown_2">
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Quy định 1
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Quy định  2
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Quy định  3
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#">Liên hệ</a>
                        </li>
                    </ul>
                </div>

                {/* Tìm kiếm  */}
                <div className="d-flex" >
                    <input className="form-control me-2"
                        type="search" placeholder="Tìm kiếm"
                        aria-label="Search"
                        value={tuKhoaTamThoi}
                        onChange={onSearchInputChange}
                    />
                    <button
                        className="btn btn-outline-success"
                        type="button"
                        onClick={handleSearch}
                    >
                        <Search />
                        {/* Tìm kiếm */}
                    </button>
                </div>

                {/* //Biểu tượng giỏ hang */}
                <ul className="navbar-nav me-1">
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <i className="fas fa-shopping-cart"></i>
                        </a>
                    </li>
                </ul>


                {/* //Biểu tượng đăng nhập  */}
                <ul className="navbar-nav me-1">
                    <li className="nav-item">
                        {
                            isLoggedIn ? (
                                <>
                                    <a className="nav-link dropdown-toggle" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {userName}
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                                        <li><Link className="dropdown-item" to="/thongTinTaiKhoan">Thông tin tài khoản</Link></li>
                                        <li><Link className="dropdown-item" to="/caiDat">Cài đặt</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><button className="dropdown-item" onClick={handleLogout}>Đăng xuất</button></li>
                                    </ul>
                                </>
                            ) : (
                                <Link className="nav-link" to="/dangNhap">
                                    <i className="fas fa-user"></i>
                                </Link>
                            )
                        }




                    </li>
                </ul>


            </div>
        </nav>
    )
}
export default Navbar;