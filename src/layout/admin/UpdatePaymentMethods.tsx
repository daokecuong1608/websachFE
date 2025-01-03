import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import request from "../../utils/request";
import "./css/UpdatePaymentMethods.css";
import RequireAdmin from "./RequireAdmin";

interface PaymentMethods {
    maHinhThucThanhToan: number;
    tenHinhThucThanhToan: string;
    chiPhiThanhToan: number;
}

const UpdatePaymentMethods: React.FC = () => {
    const { maHinhThucThanhToan } = useParams<{ maHinhThucThanhToan: string }>();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethods | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchPaymentMethod();
    }, [maHinhThucThanhToan]);

    const fetchPaymentMethod = async () => {
        setLoading(true);
        try {
            const response = await request.get(`/api/hinh-thuc-thanh-toan/${maHinhThucThanhToan}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            setPaymentMethod(response.data);
            setError(null);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu hình thức thanh toán:', error);
            setError('Không thể tải dữ liệu hình thức thanh toán. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    }

    const handleUpdate = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!paymentMethod?.tenHinhThucThanhToan || paymentMethod.chiPhiThanhToan <= 0) {
            alert("Tên hình thức thanh toán và chi phí phải hợp lệ.");
            return;
        }

        setLoading(true);
        try {
            const response = await request.put(`/api/hinh-thuc-thanh-toan/${paymentMethod.maHinhThucThanhToan}`, {
                tenHinhThucThanhToan: paymentMethod.tenHinhThucThanhToan,
                chiPhiThanhToan: paymentMethod.chiPhiThanhToan
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            alert('Cập nhật thành công!');
            navigate('/admin/payment'); // Quay lại danh sách hình thức thanh toán
        } catch (error) {
            console.error('Lỗi khi cập nhật hình thức thanh toán:', error);
            setError('Không thể cập nhật hình thức thanh toán. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="update-payment-method-container">
            {loading && <p className="loading-message">Đang tải dữ liệu...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && paymentMethod && (
                <form className="update-payment-method-form" onSubmit={handleUpdate}>
                    <div className="form-group">
                        <label htmlFor="tenHinhThucThanhToan">Tên hình thức thanh toán:</label>
                        <input
                            type="text"
                            id="tenHinhThucThanhToan"
                            value={paymentMethod.tenHinhThucThanhToan}
                            onChange={(e) => setPaymentMethod({
                                ...paymentMethod,
                                tenHinhThucThanhToan: e.target.value
                            })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="chiPhiThanhToan">Chi phí thanh toán:</label>
                        <input
                            type="number"
                            id="chiPhiThanhToan"
                            value={paymentMethod.chiPhiThanhToan}
                            onChange={(e) => setPaymentMethod({
                                ...paymentMethod,
                                chiPhiThanhToan: Number(e.target.value)
                            })}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit">Cập nhật</button>
                    </div>
                </form>
            )}
        </div>
    );
}
const UpdatePaymentMethods_Admin = RequireAdmin(UpdatePaymentMethods)
export default UpdatePaymentMethods_Admin;
