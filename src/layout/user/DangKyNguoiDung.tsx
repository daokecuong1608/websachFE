import React, { useState } from "react";

function DangKyNguoiDung() {

    const [tenDangNhap, setTenDangNhap] = useState('');
    const [email, setEmail] = useState('');
    const [hoDem, setHoDem] = useState('');
    const [ten, setTen] = useState('');
    const [soDienThoai, setSoDienThoai] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [matKhauNhapLai, setMatKhauNhapLai] = useState('');
    const [gioiTinh, setGioiTinh] = useState('');
    const [thongBao, setThongBao] = useState('');


    const [errorMatKhauNhapLai, setErrorMatKhauNhapLai] = useState('');
    const [errorMatKhau, setErrorMatKhau] = useState('');
    const [errorTenDangNhap, setErrorTenDangNhap] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    //xử lý sự kiện submit
    const handleSubmit = async (e: React.FormEvent) => {
        //clear any prevision error massage
        setErrorTenDangNhap('');
        setErrorEmail('');
        setErrorMatKhau('');
        setErrorMatKhauNhapLai('');

        //tránh click liên tuc
        e.preventDefault();

        //kiểm tra các điều kiện và gắn kết quả vào biến
        const isTenDangNhapValid = !await kiemTraTenDangNhapDaTonTai(tenDangNhap);
        const isEmailValid = !await kiemTraEmailTonTai(email);
        const isMatKhauValid = !kiemTraMatKhau(matKhau);
        const isMatKhauNhapLaiValid = !kiemTraMatKhauNhapLai(matKhauNhapLai);

        //kiểm tra các điều kiện
        if (isTenDangNhapValid && isEmailValid && isMatKhauValid && isMatKhauNhapLaiValid) {
            try {
                const url = 'http://localhost:8080/tai-khoan/dang-ky';
                console.log('url', url);
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tenDangNhap: tenDangNhap,
                        email: email,
                        matKhau: matKhau,
                        hoDem: hoDem,
                        ten: ten,
                        soDienThoai: soDienThoai,
                        gioiTinh: gioiTinh,
                        daKichHoat: 0,
                        maKichHoat: ""
                    })
                }
                )
                if (response.ok) {
                    setThongBao('Đăng ký thành công , vui lòng kiểm tra email để kích hoạt.');
                } else {
                    console.log('response', response.json());
                    setThongBao('Đăng ký không thành công , vui lòng thử lại sau.');
                }
            } catch (error) {
                setThongBao('Đăng ký không thành công , vui lòng thử lại sau.');
            }
        }

    }
    //kiểm tra tên đăng nhập đã tồn tại chưa
    const kiemTraTenDangNhapDaTonTai = async (tenDangNhap: string) => {
        const url = `http://localhost:8080/nguoi-dung/search/existsByTenDangNhap?tenDangNhap=${tenDangNhap}`
        console.log('url', url);
        //call api
        try {
            const response = await fetch(url);
            const data = await response.text();
            if (data === "true") {
                setErrorTenDangNhap('Tên đăng nhập đã tồn tại')
                return true;
            }
            return false;
        } catch (error) {
            console.error('Lỗi khi kiểm tra tên đăng nhập :', error);
            return false;
        }

    }
    //xử lý sự kiện thay đổi tên đăng nhập
    const handleTenDangNhap = async (e: React.ChangeEvent<HTMLInputElement>) => {
        // thay đổi giá trị của state tenDangNhap
        setTenDangNhap(e.target.value);
        //kiểm tra lỗi 
        setErrorTenDangNhap('');
        return kiemTraTenDangNhapDaTonTai(e.target.value);
    }


    //kiểm tra email đã tồn tại chưa
    const kiemTraEmailTonTai = async (email: string) => {
        const url = `http://localhost:8080/nguoi-dung/search/existsByEmail?email=${email}`
        console.log('url', url);
        //call api
        try {
            const response = await fetch(url);
            const data = await response.text();
            if (data === "true") {
                setErrorEmail('Email đã tồn tại');
                return true;
            }
            return false;

        } catch (error) {
            console.log("error", error);
            return false;
        }
    }
    const handleEmail = async (e: React.ChangeEvent<HTMLInputElement>) => {
        // thay đổi giá trị của state tenDangNhap
        setEmail(e.target.value);
        //kiểm tra lỗi 
        setErrorEmail('');
        return kiemTraEmailTonTai(e.target.value);
    }

    const kiemTraMatKhau = (matKhau: string) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(matKhau)) {
            setErrorMatKhau('Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái và số');
            return true;
        } else {
            setErrorMatKhau('');//mật khẩu hợp lệ
            return false;
        }
    }

    const handleMatKhauChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //thay đổi giá trị của state
        setMatKhau(e.target.value);
        //ktra sự tồn tại
        setErrorMatKhau('');
        return kiemTraMatKhau(e.target.value);
    }

    const kiemTraMatKhauNhapLai = (matKhauNhapLai: string) => {
        if (matKhauNhapLai !== matKhau) {
            setErrorMatKhauNhapLai('Mật khẩu không trùng khớp');
            return true;
        } else {
            setErrorMatKhauNhapLai('');
            return false;
        }
    }
    const handleMatKhauNhapLaiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMatKhauNhapLai(e.target.value);
        setErrorMatKhauNhapLai('');
        return kiemTraMatKhauNhapLai(e.target.value);
    }
    return (
        <div className="container">
            <h1 className="mt-5 text-center">Đăng ký </h1>
            <div className="mb-3 col-md-6 col-12 mx-auto">

                <form onSubmit={handleSubmit} className="form">

                    <div className="mb-3">
                        <label htmlFor="tenDangNhap" className="form-label">Tên đăng nhập</label>
                        <input type="text"
                            className="form-control"
                            id="tenDangNhap"
                            value={tenDangNhap}
                            onChange={handleTenDangNhap} />
                        <div style={{ color: "red" }}>{errorTenDangNhap}</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="text"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={handleEmail} />
                        <div style={{ color: "red" }}>{errorEmail}</div>
                    </div>


                    <div className="mb -3">
                        <label className="form-label" htmlFor="matKhau" >Mật khẩu</label>
                        <input type="password"
                            id="matKhau"
                            className="form-control"
                            value={matKhau}
                            onChange={handleMatKhauChange} />
                        <div style={{ color: "red" }}> {errorMatKhau}</div>
                    </div>


                    <div className="mb -3">
                        <label className="form-label" htmlFor="matKhauNhapLai">Nhập lại mật khẩu</label>
                        <input type="password"
                            id="matKhauNhapLai"
                            className="form-control"
                            value={matKhauNhapLai}
                            onChange={handleMatKhauNhapLaiChange} />
                        <div style={{ color: "red" }}> {errorMatKhauNhapLai}</div>
                    </div>


                    <div className="mb -3">
                        <label className="form-label" htmlFor="hoDem">Họ đệm</label>
                        <input type="text"
                            id="hoDem"
                            className="form-control"
                            value={hoDem}
                            onChange={(e) => setHoDem(e.target.value)} />
                    </div>


                    <div className="mb -3">
                        <label className="form-label" htmlFor="ten">Tên</label>
                        <input type="text"
                            id="ten"
                            className="form-control"
                            value={ten}
                            onChange={(e) => setTen(e.target.value)} />
                    </div>

                    <div className="mb -3">
                        <label className="form-label" htmlFor="soDienThoai">Số điện thoại:</label>
                        <input type="text"
                            id="soDienThoai"
                            className="form-control"
                            value={soDienThoai}
                            onChange={(e) => setSoDienThoai(e.target.value)} />
                        {/* <div style={{ color: "red" }}> {errorSoDienThoai}</div> */}

                    </div>


                    <div className="mb-3">
                        <label className="form-label" htmlFor="gioiTinh">Giới tính:</label>
                        <select
                            id="gioiTinh"
                            className="form-control"
                            value={gioiTinh}
                            onChange={(e) => setGioiTinh(e.target.value)} >
                            <option value=""></option>
                            <option value="nam">XY</option>
                            <option value="nu">XX</option>
                            <option value="khac">Khác</option>
                        </select>
                    </div>


                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Đăng ký</button>
                        <div style={{ color: "green" }}>{thongBao}</div>
                    </div>

                </form>
            </div>

        </div>

    );

}
export default DangKyNguoiDung;