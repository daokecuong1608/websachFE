import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface Props { }

interface JwtPayload {
    isAdmin: boolean;
    isStaff: boolean;
    isUser: boolean;
}

const RequireAdmin = <P extends object>(WrappedComponent: React.ComponentType<P>) => {

    const WithAdmininCheck: React.FC<P> = (props) => {
        const navigate = useNavigate();

        useEffect(() => {
            //trong tình huống chưa đăng nhập 
            const token = localStorage.getItem('token');
            console.log("token" + token);
            if (!token) {
                navigate('/dangNhap');
                return;
            } else {
                //giải mã token để lấy thông tin user
                const decodedToken = jwtDecode(token) as JwtPayload;
                console.log(decodedToken);

                //lấy thông tin cụ thể
                const isAdmin = decodedToken.isAdmin;
                console.log("isAdmin : " + isAdmin);
                //kiểm tra không phải admin 
                if (!isAdmin) {
                    navigate("/loi_403")
                    return;
                }
            }
        }, [navigate])
        return <WrappedComponent {...props} />
    }
    return WithAdmininCheck;
}
export default RequireAdmin;