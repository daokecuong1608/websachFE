import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import request from "../../utils/request";
import "./css/UpdateDeliveryMethod.css";

interface DeliveryMethod {
    maHinhThucGiaoHang: number;
    tenHinhThucGiaoHang: string;
    chiPhiGiaoHang: number;
}

const UpdateDeliveryMethod: React.FC = () => {
    const { maHinhThucGiaoHang } = useParams<{ maHinhThucGiaoHang: string }>(); // Lấy maHinhThucGiaoHang từ URL
    const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod | null>(null); // Lưu thông tin hình thức giao hàng
    const [loading, setLoading] = useState<boolean>(false); // Trạng thái tải dữ liệu
    const [error, setError] = useState<string | null>(null); // Lỗi khi tải dữ liệu
    const navigate = useNavigate(); // Dùng để điều hướng sau khi cập nhật

    useEffect(() => {
        fetchDeliveryMethod();
    }, [maHinhThucGiaoHang]);

    // Hàm lấy thông tin hình thức giao hàng từ API
    const fetchDeliveryMethod = async () => {
        setLoading(true);
        try {
            const response = await request.get(`/api/hinh-thuc-giao-hang/${maHinhThucGiaoHang}`);
            setDeliveryMethod(response.data); // Gán dữ liệu vào state
            setError(null); // Reset lỗi
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu hình thức giao hàng:', error);
            setError('Không thể tải thông tin hình thức giao hàng. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    // Hàm xử lý cập nhật thông tin hình thức giao hàng
    const handleUpdate = async () => {
        if (!deliveryMethod?.tenHinhThucGiaoHang || deliveryMethod.chiPhiGiaoHang <= 0) {
            alert("Tên hình thức giao hàng và phí giao hàng không hợp lệ.");
            return;
        }

        setLoading(true); // Bật trạng thái tải
        try {
            await request.put(`/api/hinh-thuc-giao-hang/${deliveryMethod.maHinhThucGiaoHang}`, {
                tenHinhThucGiaoHang: deliveryMethod.tenHinhThucGiaoHang,
                chiPhiGiaoHang: deliveryMethod.chiPhiGiaoHang
            });
            alert('Cập nhật thành công!');
            navigate('/admin/delivery'); // Điều hướng về danh sách hình thức giao hàng
        } catch (error) {
            console.error('Lỗi khi cập nhật hình thức giao hàng:', error);
            setError('Không thể cập nhật hình thức giao hàng. Vui lòng thử lại sau.');
        } finally {
            setLoading(false); // Dừng trạng thái tải
        }
    };

    return (
        <div className="update-delivery-method-container">
            <h1>Cập nhật hình thức giao hàng</h1>
            {loading && <p>Đang tải dữ liệu...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && deliveryMethod && (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdate();
                }}>
                    <div className="form-group">
                        <label htmlFor="tenHinhThucGiaoHang">Tên Hình Thức Giao Hàng:</label>
                        <input
                            type="text"
                            id="tenHinhThucGiaoHang"
                            value={deliveryMethod.tenHinhThucGiaoHang}
                            onChange={(e) => setDeliveryMethod({
                                ...deliveryMethod,
                                tenHinhThucGiaoHang: e.target.value
                            })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="chiPhiGiaoHang">Phí Giao Hàng:</label>
                        <input
                            type="number"
                            id="chiPhiGiaoHang"
                            value={deliveryMethod.chiPhiGiaoHang}
                            onChange={(e) => setDeliveryMethod({
                                ...deliveryMethod,
                                chiPhiGiaoHang: Number(e.target.value)
                            })}
                        />
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="update-btn">
                            Cập nhật
                        </button>
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate('/admin/delivery-methods')} // Hủy và quay lại danh sách
                        >
                            Hủy
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default UpdateDeliveryMethod;
