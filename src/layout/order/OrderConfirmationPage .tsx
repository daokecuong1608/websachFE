import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import request from "../../utils/request";

interface SanPham {
    maSanPham: number;
    tenSanPham: string;
    soLuong: number;
    giaBan: number;
    hinhAnh: string; // Thêm trường hình ảnh vào mỗi sản phẩm
}

interface OrderDetails {
    maDonHang: number;
    ngayTao: string; // Thêm trường ngày tạo đơn hàng
    diaChiNhanHang: string;
    tongTienSanPham: number;
    chiPhiGiaoHang: number;
    chiPhiThanhToan: number;
    tongTien: number;
    trangThai: string;
    sanPham: SanPham[]; // Mảng sản phẩm
}

const OrderConfirmationPage = (): JSX.Element => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Gọi API để lấy thông tin đơn hàng
    useEffect(() => {
        if (!id) {
            navigate("/"); // Nếu không có id, điều hướng về trang chủ
            return;
        }
        fetchOrderDetails(id); // Fetch thông tin đơn hàng từ API
    }, [id]); // useEffect chạy lại khi `id` thay đổi

    // Hàm fetch thông tin đơn hàng từ server
    const fetchOrderDetails = async (orderId: string) => {
        try {
            const response = await request.get(`/api/don-hang/${orderId}`); // Gọi API để lấy chi tiết đơn hàng
            setOrderDetails(response.data); // Lưu dữ liệu đơn hàng vào state
            setLoading(false); // Đổi trạng thái loading thành false
        } catch (error) {
            console.error("Error fetching order details:", error);
            setLoading(false); // Đổi trạng thái loading nếu có lỗi
        }
    };

    // Tính toán ngày giao hàng dựa trên ngày tạo đơn
    const calculateDeliveryDate = (orderDate: string): string => {
        const orderDateObj = new Date(orderDate); // Chuyển chuỗi ngày thành đối tượng Date
        orderDateObj.setDate(orderDateObj.getDate() + 3); // Thêm 3 ngày vào ngày tạo đơn
        return orderDateObj.toLocaleDateString(); // Trả về ngày giao hàng dự kiến dưới dạng chuỗi
    };

    // Hiển thị trạng thái loading
    if (loading) {
        return <div>Đang tải thông tin đơn hàng...</div>;
    }

    // Kiểm tra nếu không có thông tin đơn hàng
    if (!orderDetails) {
        return <div>Không tìm thấy thông tin đơn hàng. Vui lòng thử lại.</div>;
    }

    // Tính toán ngày nhận hàng dự kiến
    const deliveryDate = calculateDeliveryDate(orderDetails.ngayTao);

    return (
        <div className="order-confirmation">
            <h2>Đơn hàng của bạn đã được đặt thành công!</h2>
            {/* Hiển thị các thông tin cơ bản của đơn hàng */}
            <p>Mã đơn hàng: <strong>{orderDetails.maDonHang}</strong></p>
            <p>Ngày đặt hàng: <strong>{new Date(orderDetails.ngayTao).toLocaleDateString()}</strong></p>
            <p>Ngày nhận hàng dự kiến: <strong>{deliveryDate}</strong></p>
            <p>Địa chỉ nhận hàng: <strong>{orderDetails.diaChiNhanHang}</strong></p>
            <p>Trạng thái đơn hàng: <strong>{orderDetails.trangThai}</strong></p>

            <h3>Chi tiết sản phẩm:</h3>
            <table className="order-details-table">
                <thead>
                    <tr>
                        <th>Hình ảnh</th> {/* Cột hình ảnh */}
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {orderDetails.sanPham.map((item, index) => (
                        <tr key={index}>
                            {/* Thêm hình ảnh sản phẩm */}
                            <td>
                                <img
                                    src={item.hinhAnh}
                                    alt={item.tenSanPham}
                                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                />
                            </td>
                            <td>{item.tenSanPham}</td>
                            <td>{item.soLuong}</td>
                            <td>{item.giaBan.toLocaleString()} VND</td>
                            <td>{(item.giaBan * item.soLuong).toLocaleString()} VND</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Tổng cộng:</h3>
            <p>Tổng tiền sản phẩm: <strong>{orderDetails.tongTienSanPham.toLocaleString()} VND</strong></p>
            <p>Chi phí giao hàng: <strong>{orderDetails.chiPhiGiaoHang.toLocaleString()} VND</strong></p>
            <p>Chi phí thanh toán: <strong>{orderDetails.chiPhiThanhToan.toLocaleString()} VND</strong></p>
            <p>Tổng thanh toán: <strong>{orderDetails.tongTien.toLocaleString()} VND</strong></p>

            {/* Nút quay về trang chủ */}
            <button onClick={() => navigate("/")}>Quay về trang chủ</button>
        </div>
    );
};

export default OrderConfirmationPage;
