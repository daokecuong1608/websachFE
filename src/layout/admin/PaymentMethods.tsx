import { useEffect, useState } from "react";
import request from "../../utils/request";
import "./css/PaymentMethods.css"; // Đảm bảo có tệp CSS
import RequireAdmin from "./RequireAdmin";

interface PaymentMethodsProps {
    maHinhThucThanhToan: number;
    tenHinhThucThanhToan: string;
    chiPhiThanhToan: number;
}

const PaymentMethods: React.FC = () => {
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethodsProps[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchPaymentMethods();
    }, []);

    const fetchPaymentMethods = async () => {
        setLoading(true);
        try {
            const response = await request.get('/api/hinh-thuc-thanh-toan', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            setPaymentMethods(response.data);
            setError(null);
        } catch (err) {
            console.error('Lỗi khi lấy dữ liệu hình thức thanh toán:', err);
            setError('Không thể tải danh sách hình thức thanh toán. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (value: number) => {
        return value.toLocaleString("vi-VN") + " VND";
    };

    const handleDelete = async (maHinhThucThanhToan: number) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa hình thức thanh toán này?')) {
            setLoading(true);
            try {
                await request.delete(`/api/hinh-thuc-thanh-toan/${maHinhThucThanhToan}`);
                fetchPaymentMethods();
            } catch (err) {
                console.error('Lỗi khi xóa hình thức thanh toán:', err);
                setError('Không thể xóa hình thức thanh toán. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        }
    }

    const handleUpdate = async (maHinhThucThanhToan: number) => {
        window.location.href = `/admin/update-payment/${maHinhThucThanhToan}`;

    }

    return (
        <div className="payment-container">
            <h1>Quản lý Hình Thức Thanh Toán</h1>
            {loading && <p>Đang tải dữ liệu...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && (
                <table className="payment-table">
                    <thead>
                        <tr>
                            <th>Mã Hình Thức Thanh Toán</th>
                            <th>Tên Hình Thức Thanh Toán</th>
                            <th>Chi Phí Thanh Toán</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentMethods.map((paymentMethod) => (
                            <tr key={paymentMethod.maHinhThucThanhToan}>
                                <td>{paymentMethod.maHinhThucThanhToan}</td>
                                <td>{paymentMethod.tenHinhThucThanhToan}</td>
                                <td>{formatCurrency(paymentMethod.chiPhiThanhToan)}</td>
                                <td>
                                    <a className="update-btn" onClick={() => handleUpdate(paymentMethod.maHinhThucThanhToan)}>Update</a>
                                    <a className="delete-btn" onClick={() => handleDelete(paymentMethod.maHinhThucThanhToan)}>Delete</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
const PaymentMethods_Admin = RequireAdmin(PaymentMethods)
export default PaymentMethods_Admin;
