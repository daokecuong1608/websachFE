import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RequireAdmin from "./RequireAdmin";
import request from "../../utils/request";
import './css/UpdateOrder.css';
interface OrderProps {
    maDonHang: number;
    ngayTao: string;
    diaChiNhanHang: string;
    tongTienSanPham: number;
    chiPhiGiaoHang: number;
    chiPhiThanhToan: number;
    tongTien: number;
    trangThai: string;
    ten: string;
}

const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
};

const UpdateOrder: React.FC = () => {
    const { maDonHang } = useParams<{ maDonHang: string }>();
    const [order, setOrder] = useState<OrderProps | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate(); // Dùng để điều hướng sau khi cập nhật

    useEffect(() => {
        if (maDonHang) {
            fetchOrder();
        }
    }, [maDonHang]);

    const fetchOrder = async () => {
        setLoading(true);
        try {
            const response = await request.get(`/api/don-hang/getByID/${maDonHang}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setOrder(response.data);
            setError(null);
        } catch (error) {
            console.error("Error fetching order:", error);
            setError("Không thể tải dữ liệu đơn hàng. Vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!order) return;

        setLoading(true);
        try {
            await request.put(`/api/don-hang/${maDonHang}`, order, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            alert("Cập nhật đơn hàng thành công!");
            navigate('/admin/order'); // Điều hướng về danh sách hình thức giao hàng

        } catch (error) {
            console.error("Error updating order:", error);
            setError("Không thể cập nhật đơn hàng. Vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (key: keyof OrderProps, value: any) => {
        setOrder((prev) => (prev ? { ...prev, [key]: value } : null));
    };

    return (
        <div className="update-order-container">
            <h2>Cập nhật đơn hàng</h2>
            {loading && <p>Đang tải...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && order && (
                <form onSubmit={handleUpdate} className="order-form">
                    <div className="order-form-left">
                        {/* Thông tin khách hàng */}
                        <div className="form-group">
                            <label htmlFor="ten">Tên khách hàng</label>
                            <input
                                type="text"
                                id="ten"
                                value={order.ten || ""}
                                onChange={(e) => handleChange("ten", e.target.value)}
                                disabled
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="diaChiNhanHang">Địa chỉ nhận hàng</label>
                            <input
                                type="text"
                                id="diaChiNhanHang"
                                value={order.diaChiNhanHang || ""}
                                onChange={(e) => handleChange("diaChiNhanHang", e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="tongTienSanPham">Tổng tiền sản phẩm</label>
                            <input
                                type="number"
                                id="tongTienSanPham"
                                value={order.tongTienSanPham || ""}
                                onChange={(e) => handleChange("tongTienSanPham", parseFloat(e.target.value))}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="ngayTao">Ngày tạo</label>
                            <input type="text" id="ngayTao" value={formatDate(order.ngayTao)} disabled />
                        </div>
                    </div>

                    <div className="order-form-right">
                        {/* Thông tin đơn hàng */}
                        <div className="form-group">
                            <label htmlFor="chiPhiGiaoHang">Chi phí giao hàng</label>
                            <input type="number" id="chiPhiGiaoHang" value={order.chiPhiGiaoHang || ""} disabled />
                        </div>

                        <div className="form-group">
                            <label htmlFor="chiPhiThanhToan">Chi phí thanh toán</label>
                            <input type="number" id="chiPhiThanhToan" value={order.chiPhiThanhToan || ""} disabled />
                        </div>

                        <div className="form-group">
                            <label htmlFor="tongTien">Tổng tiền</label>
                            <input type="number" id="tongTien" value={order.tongTien || ""} disabled />
                        </div>

                        <div className="form-group">
                            <label htmlFor="trangThai">Trạng thái</label>
                            <input
                                type="text"
                                id="trangThai"
                                value={order.trangThai || ""}
                                onChange={(e) => handleChange("trangThai", e.target.value)}
                                disabled
                            />
                        </div>

                        <button type="submit" disabled={loading}>
                            {loading ? "Đang cập nhật..." : "Cập nhật"}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

const UpdateOrder_Admin = RequireAdmin(UpdateOrder);
export default UpdateOrder_Admin;
