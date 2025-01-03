import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './css/Dashboard.css';
import RequireAdmin from "./RequireAdmin";
interface JwtPayload {
    isAdmin: boolean;
    isStaff: boolean;
    isUser: boolean;
}

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate("/login")
        } else {
            try {
                const decodedToken = jwtDecode(token) as JwtPayload;
                const isAdmin = decodedToken.isAdmin;

                if (!isAdmin) {
                    navigate("/401")
                    return;
                }
            } catch (error) {
                console.error('Token không hợp lệ:', error);
                navigate('/login'); // Nếu giải mã không thành công, điều hướng về trang login

            }
        }
    }, [navigate])


    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Admin Dashboard</h1>
            </header>
            <main className="dashboard-main">
                <section>
                    <h2>Quản lý thể loại</h2>
                    <button className="manage-button" onClick={() => navigate('/admin/categories')}>
                        Xem và Quản lý
                    </button>
                </section>

                <section className="dashboard-section">
                    <h2>Quản lý hình thức giao hàng</h2>
                    <button className="manage-button" onClick={() => navigate('/admin/delivery')}>
                        Xem và Quản lý
                    </button>
                </section>

                <section className="dashboard-section">
                    <h2>Quản lý hình thức thanh toán</h2>
                    <button className="manage-button" onClick={() => navigate('/admin/payment')}>
                        Xem và Quản lý
                    </button>
                </section>

                <section className="dashboard-section">
                    <h2>Quản lý sản phẩm</h2>
                    <button className="manage-button" onClick={() => navigate('/products')}>
                        Xem và Quản lý
                    </button>
                </section>

                <section className="dashboard-section">
                    <h2>Quản lý đơn hàng</h2>
                    <button className="manage-button" onClick={() => navigate('/admin/orders')}>
                        Xem và Quản lý
                    </button>
                </section>
            </main>
        </div>

    )
}
const Dashboard_Admin = RequireAdmin(Dashboard);
export default Dashboard_Admin;