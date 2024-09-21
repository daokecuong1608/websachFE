import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './css/DangNhap.css';
const DangNhap = () => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = () => {
        const loginRequest = {
            username: username,
            password: password
        }
        fetch(
            'http://localhost:8080/tai-khoan/dang-nhap',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginRequest)
            }).then(
                (response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Đăng nhập thất bại');
                    }
                }
            ).then(
                (data) => {
                    const { jwt } = data;
                    //lưu trữ jwt vào local storage(bộ nhớ) or cookie
                    localStorage.setItem('token', jwt);
                    //chuyển hướng sang trang chủ
                    // window.location.href = '/';
                    setError('Đang nhập thành công ');
                }
            ).catch(error => {
                //xử lý khi đăng nhập thất bại 
                console.log('Đăng nhập thất bại ', error);
                setError('Đăng nhập thất bại vui lòng kiểm tra lại tên đăng nhập và mật khẩu');
            }
            )
    }

    return (

        <div className="login-container">

            <form className="form-signin">
                <div className='header '>
                    <span> Don't have an account yet ?</span>
                    <button className='btn btn-secondary' onClick={() => { navigate('/register') }} >Sign up</button>
                </div>
                <h1 className="h3 mb-3 font-weight-normal">Login</h1>
                <label className="sr-only" >User name</label>
                <input type="username"
                    id="username"
                    className="form-control mb-2"
                    placeholder="Email address"
                    required
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <label className="sr-only">Password</label>
                <input type="password" id="password"
                    className="form-control mb-2"
                    placeholder="Password"
                    required value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="button"
                    onClick={handleLogin}
                >Đăng nhập</button>
                {
                    error && (
                        <div className="alert alert-danger mt-2" style={{ color: "red" }}>
                            {error}
                        </div>
                    )
                }
                <div>
                    <span className='forgot-password'>Forgot password ?</span>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => { navigate('/') }}>
                        &#60;&#60;Go to Homepage
                    </span>
                </div>



                {/* 
        <p className="mt-5 mb-3 text-muted">&copy; 2024-2025</p> */}
            </form>
        </div>
    )

}
export default DangNhap;