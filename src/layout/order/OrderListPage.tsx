import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "../../utils/request";
import "./css/OrderListPage.css";
// Interface cho thông tin đơn hàng
interface Order {
    maDonHang: number;
    ngayTao: string;
    tongTien: number;
    trangThai: string;
}

// Function component cho danh sách đơn hàng
const OrderListPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]); // Lưu trữ danh sách đơn hàng
    const [loading, setLoading] = useState<boolean>(true); // Trạng thái tải dữ liệu
    const [error, setError] = useState<string | null>(null); // Lỗi khi tải dữ liệu
    const navigate = useNavigate();

    // Fetch danh sách đơn hàng khi component được mount
    useEffect(() => {
        const fetchOrders = async () => {
            const userId = localStorage.getItem("userId");

            // Kiểm tra userId hợp lệ
            if (!userId || isNaN(Number(userId))) {
                setLoading(false);
                setError("User ID không tồn tại hoặc không hợp lệ.");
                return;
            }

            try {
                const response = await request.get(`/api/don-hang/order/${userId}`);
                const ordersData: Order[] = response.data;
                setOrders(ordersData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError("Lỗi khi tải danh sách đơn hàng.");
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Xử lý khi nhấn nút "Xem chi tiết"
    const handleViewDetails = (maDonHang: number) => {
        console.log("Chuyển sang trang chi tiết sản phẩm của đơn hàng :", maDonHang);
        navigate(`/order-detail-page/${maDonHang}`); // Điều hướng tới trang chi tiết đơn hàng
    };

    // Xử lý thay đổi trạng thái đơn hàng
    const handleChangeStatus = async (maDonHang: number) => {
        if (window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) {
            try {
                // Giả sử bạn muốn thay đổi trạng thái đơn hàng thành "HUY"
                await request.put(`/api/don-hang/${maDonHang}/HUY`, null, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                // Sau khi thay đổi trạng thái, cập nhật lại danh sách đơn hàng
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order.maDonHang === maDonHang ? { ...order, trangThai: "HUY" } : order
                    )
                );
                alert('Trạng thái đơn hàng đã được thay đổi thành công!');
            } catch (error) {
                console.error('Lỗi khi thay đổi trạng thái:', error);
                setError('Không thể thay đổi trạng thái đơn hàng. Vui lòng thử lại.');
            }
        }
    };

    if (loading) {
        return <div className="order-loading">Đang tải danh sách đơn hàng...</div>;
    }

    if (error) {
        return <div className="order-error">{error}</div>;
    }

    if (!orders.length) {
        return <div className="order-empty">Không có đơn hàng nào.</div>;
    }

    return (
        <div className="order-list-container">
            <h2 className="order-list-heading">Danh sách đơn hàng</h2>
            <table className="order-list-table">
                <thead>
                    <tr>
                        <th>Mã đơn hàng</th>
                        <th>Ngày tạo</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                        <th>Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.maDonHang}>
                            <td>{order.maDonHang}</td>
                            <td>{new Date(order.ngayTao).toLocaleDateString()}</td>
                            <td>{order.tongTien.toLocaleString()} VND</td>

                            <td>
                                <button
                                    onClick={() => handleChangeStatus(order.maDonHang)}
                                    className={`order-status-button ${order.trangThai === "DA_GIAO" || order.trangThai === "HUY" ? "disabled" : ""}`}
                                    disabled={order.trangThai === "DA_GIAO" || order.trangThai === "HUY"}
                                >
                                    {order.trangThai}
                                </button>
                            </td>

                            <td>
                                <button
                                    className="order-details-button"
                                    onClick={() => handleViewDetails(order.maDonHang)}
                                >
                                    Xem chi tiết
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderListPage;
