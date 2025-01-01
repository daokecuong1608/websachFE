import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import request from '../../utils/request';
import './css/DangNhap.css';
import { jwtDecode } from 'jwt-decode';
interface JwtPayload {
    isAdmin: boolean;
    isStaff: boolean;
    isUser: boolean;
}
interface GoogleJwtPayload {
    name: string;
    email: string;
    // Các thuộc tính khác nếu cần
}


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
                    const { jwt, id } = data;
                    //lưu trữ jwt vào local storage(bộ nhớ) or cookie
                    localStorage.setItem('token', jwt);
                    localStorage.setItem('username', username);
                    localStorage.setItem('userId', id); // Save the user ID
                    console.log('id', id);


                    const decodedToken = jwtDecode(jwt) as JwtPayload;
                    console.log(decodedToken);

                    const isAdmin = decodedToken.isAdmin;
                    if (isAdmin) {
                        navigate("/admin/dash-board")
                        return;
                    }


                    //chuyển hướng sang trang chủ
                    window.location.href = '/';
                    setError('Đang nhập thành công ');
                }
            ).catch(error => {
                //xử lý khi đăng nhập thất bại 
                console.log('Đăng nhập thất bại ', error);
                setError('Đăng nhập thất bại vui lòng kiểm tra lại tên đăng nhập và mật khẩu');
            }
            )
    };




    const handleGoogleLoginSuccess = async (response: any) => {
        const decoded = jwtDecode<GoogleJwtPayload>(response.credential);
        console.log(decoded);
        try {
            const res = await request.post('login/oauth2/code/google', {
                token: response.credential
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const { jwt } = res.data;
            // Lưu trữ jwt vào local storage
            localStorage.setItem('token', jwt);
            localStorage.setItem('username', decoded.name);
            // Chuyển hướng sang trang chủ
            window.location.href = '/';
        } catch (error) {
            console.log('Đăng nhập bằng Google thất bại', error);
            setError('Đăng nhập bằng Google thất bại');
        }
    };

    return (
        <div className="login-container">
            <form className="form-signin">
                <div className='header '>
                    <span> Don't have an account yet ?</span>
                    <button className='btn btn-secondary' onClick={() => { navigate('/dangKy') }} >Sign up</button>
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
                {/* <div className="google-login">
                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={() => {
                            console.log('Login Failed');
                            setError('Đăng nhập bằng Google thất bại');
                        }}
                    />
                </div> */}
            </form>
        </div>
    )
}

export default DangNhap;