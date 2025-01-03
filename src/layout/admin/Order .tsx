import { useEffect, useState } from "react";
import RequireAdmin from "./RequireAdmin";
import request from "../../utils/request";
import './css/Order.css';
import { useNavigate } from "react-router-dom";

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

const Order: React.FC = () => {
    const [orders, setOrders] = useState<OrderProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate(); // Dùng để điều hướng sau khi cập nhật

    useEffect(() => {
        fetchOrders();
    }, [])

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await request.get('/api/don-hang', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setOrders(response.data);
            setError(null);

        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu đơn hàng:', error);
            console.error('Không thể tải danh sách đơn hàng. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    }

    const handleUpdate = async (maDonHang: number) => {
        window.location.href = `/admin/update-order/${maDonHang}`;
    }
    const handleDelete = async (maDonHang: number) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
            setLoading(true);
            try {
                await request.delete(`/api/don-hang/${maDonHang}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                fetchOrders();
            } catch (error) {
                console.error('Lỗi khi xóa đơn hàng:', error);
                setError('Không thể xóa đơn hàng. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        }
    }

    const handleChangeState = async (maDonHang: number) => {
        if (window.confirm('Bạn có chắc chắn muốn thay đổi trạng thái đơn hàng này?')) {
            setLoading(true);
            try {
                await request.put(`/api/don-hang/${maDonHang}/DA_GIAO`, null, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setOrders(preOrders =>
                    preOrders.map(order =>
                        order.maDonHang === maDonHang ? { ...order, trangThai: "DA_GIAO" } : order
                    )
                )
                alert('Thay đổi trạng thái thành công!');
            } catch (error) {
                console.error('Lỗi khi thay đổi trạng thái đơn hàng:', error);
                setError('Không thể thay đổi trạng thái đơn hàng. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        }
    }

    const handleDetail = async (maDonHang: number) => {
        navigate(`/admin/order-detail/${maDonHang}`);
    }

    return (
        <div className="order-admin-container">
            <h2 className="order-admin-title">Danh sách đơn hàng</h2>
            <table className="order-admin-table">
                <thead>
                    <tr className="order-admin-table-header">
                        <th>Mã sản phẩm </th>
                        <th>Ngày tạo </th>
                        <th>Địa chỉ nhận hàng </th>
                        <th>Tổng tiền sản phẩm </th>
                        <th>Tổng tiền </th>
                        <th>Tên khách hàng </th>
                        <th>Trạng thái </th>
                        <th>Xem chi tiết</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.maDonHang} className="order-admin-table-row">
                            <td>{order.maDonHang}</td>
                            <td>{formatDate(order.ngayTao)}</td>
                            <td>{order.diaChiNhanHang}</td>
                            <td>{order.tongTienSanPham.toLocaleString()} VND </td>
                            <td>{order.tongTien.toLocaleString()} VND </td>
                            <td>{order.ten}</td>
                            <td>
                                <button
                                    className="order-admin-status"
                                    disabled={order.trangThai === "DA_GIAO" || order.trangThai === "HUY"}
                                    onClick={() => handleChangeState(order.maDonHang)}
                                >
                                    {order.trangThai}
                                </button>
                            </td>

                            <td>
                                <a className="order-admin-detail-button" onClick={() => handleDetail(order.maDonHang)}>Xem chi tiết</a>
                            </td>
                            <td>
                                <a
                                    className="order-admin-update-button"
                                    onClick={() => handleUpdate(order.maDonHang)}
                                >
                                    Cập nhật
                                </a>
                                <a
                                    className="order-admin-delete-button"
                                    onClick={() => handleDelete(order.maDonHang)}
                                >
                                    Xóa
                                </a>
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )

}
const Order_Admin = RequireAdmin(Order);
export default Order_Admin;