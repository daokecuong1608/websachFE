import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "../../utils/request";

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
            const userId = Number(localStorage.getItem("userId")); // Lấy userId từ localStorage

            if (!userId) {
                setLoading(false);
                setError("User ID không tồn tại.");
                return;
            }

            try {
                const response = await request.get(`/api/don-hang/order/${userId}`);
                const ordersData: Order[] = response.data;
                setOrders(ordersData);
                console.log("Orders:", ordersData);
                setLoading(false);
            } catch (error) {
                setError("Lỗi khi tải danh sách đơn hàng.");
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Xử lý khi nhấn nút "Xem chi tiết"
    const handleViewDetails = (maDonhang: number) => {
        console.log("Chuyển sang trang chi tiết sản phẩm của đơn hàng :", maDonhang);
        navigate(`/order-detail-page/${maDonhang}`); // Điều hướng tới trang chi tiết đơn hàng
    }


    if (loading) {
        return <div>Đang tải danh sách đơn hàng...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!orders.length) {
        return <div>Không có đơn hàng nào.</div>;
    }

    return (
        <div className="order-list">
            <h2>Danh sách đơn hàng</h2>
            <table className="table table-bordered">
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
                            <td>{order.tongTien}</td>
                            <td>{order.trangThai}</td>
                            <td>
                                <button
                                    className="btn btn-primary"
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
