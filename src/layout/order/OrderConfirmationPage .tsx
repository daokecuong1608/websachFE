import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import request from "../../utils/request";
import "./css/OrderConfirmationPage .css"; // Make sure to import your CSS
interface SanPham {
    maSanPham: number;
    tenSach: string;
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
            console.log("Order details:", response.data);
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
            <h2 className="order-confirmation__title">Đơn hàng của bạn đã được đặt thành công!</h2>
            <p className="order-confirmation__info">
                Mã đơn hàng: <strong className="order-confirmation__info--value">{orderDetails.maDonHang}</strong>
            </p>
            <p className="order-confirmation__info">
                Ngày đặt hàng: <strong className="order-confirmation__info--value">{new Date(orderDetails.ngayTao).toLocaleDateString()}</strong>
            </p>
            <p className="order-confirmation__info">
                Ngày nhận hàng dự kiến: <strong className="order-confirmation__info--value">{deliveryDate}</strong>
            </p>
            <p className="order-confirmation__info">
                Địa chỉ nhận hàng: <strong className="order-confirmation__info--value">{orderDetails.diaChiNhanHang}</strong>
            </p>
            <p className="order-confirmation__status">
                Trạng thái đơn hàng: <strong className="order-confirmation__status--value">{orderDetails.trangThai}</strong>
            </p>

            <h3 className="order-confirmation__subtitle">Chi tiết sản phẩm:</h3>
            <table className="order-details-table">
                <thead>
                    <tr>
                        <th className="order-details-table__header">Hình ảnh</th>
                        <th className="order-details-table__header">Tên sản phẩm</th>
                        <th className="order-details-table__header">Số lượng</th>
                        <th className="order-details-table__header">Đơn giá</th>
                        <th className="order-details-table__header">Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {orderDetails.sanPham.map((item, index) => (
                        <tr key={index} className="order-details-table__row">
                            <td className="order-details-table__cell">
                                <img
                                    src={item.hinhAnh}
                                    alt={item.tenSach}
                                    className="order-details-table__image"
                                />
                            </td>
                            <td className="order-details-table__cell">{item.tenSach}</td>
                            <td className="order-details-table__cell">{item.soLuong}</td>
                            <td className="order-details-table__cell">{item.giaBan.toLocaleString()} VND</td>
                            <td className="order-details-table__cell">{(item.giaBan * item.soLuong).toLocaleString()} VND</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3 className="order-confirmation__subtitle">Tổng cộng:</h3>
            <p className="order-confirmation__summary">
                Tổng tiền sản phẩm: <strong className="order-confirmation__summary--value">{orderDetails.tongTienSanPham.toLocaleString()} VND</strong>
            </p>
            <p className="order-confirmation__summary">
                Chi phí giao hàng: <strong className="order-confirmation__summary--value">{orderDetails.chiPhiGiaoHang.toLocaleString()} VND</strong>
            </p>
            <p className="order-confirmation__summary">
                Chi phí thanh toán: <strong className="order-confirmation__summary--value">{orderDetails.chiPhiThanhToan.toLocaleString()} VND</strong>
            </p>
            <p className="order-confirmation__total">
                Tổng thanh toán: <strong className="order-confirmation__total--value">{orderDetails.tongTien.toLocaleString()} VND</strong>
            </p>

            <button className="order-confirmation__button" onClick={() => navigate("/")}>
                Quay về trang chủ
            </button>
        </div>

    );
};

export default OrderConfirmationPage;
