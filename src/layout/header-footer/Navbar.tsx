function Navbar() {
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
                            <a className="nav-link activ" aria-current="page">
                                Trang chủ
                            </a>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle"
                                href="#" id="navbarDropdown_1"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Thể loại sách
                            </a>
                            <ul className="dropdown-menu"
                                aria-labelledby="navbarDropdown_1">
                                <li>
                                    <a className="dropdown-item" >
                                        Thể loại 1
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item"  >
                                        Thể loại 2
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item">
                                        Thể loại 3
                                    </a>
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
                    // onChange={onSearchInputChange}
                    // value={tuKhoaTamThoi}
                    />
                    <button
                        className="btn btn-outline-success"
                        type="button"
                    // onClick={handleSearch}
                    >
                        {/* <Search /> */}
                        Tìm kiếm
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
                        <a className="nav-link" href="#">

                            <i className="fas fa-user"></i>
                        </a>
                    </li>
                </ul>


            </div>
        </nav>
    )
}
export default Navbar;