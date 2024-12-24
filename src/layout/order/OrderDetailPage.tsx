import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import request from "../../utils/request";

// Interface cho chi tiết đơn hàng
interface ChitietDonHang {
    chiTietDonHang: number;
    soLuong: number;
    giaBan: number;
    tenSach: string;
    hinhAnh: string[]; // Danh sách các hình ảnh sản phẩm
}

const OrderDetailPage: React.FC = () => {
    // Lấy mã đơn hàng từ URL params
    const { maDonhang } = useParams<{ maDonhang: string }>(); // Lấy `maDonhang` từ URL params
    const [orderDetails, setOrderDetails] = useState<ChitietDonHang[]>([]); // Lưu trữ chi tiết sản phẩm của đơn hàng
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Kiểm tra giá trị của `maDonhang`
    console.log("Order ID received:", maDonhang);

    // Fetch chi tiết đơn hàng khi trang được load
    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (!maDonhang) {
                setLoading(false);
                setError("Mã đơn hàng không hợp lệ.");
                return;
            }

            try {
                const response = await request.get(`/api/chi-tiet-don-hang/${maDonhang}`);
                setOrderDetails(response.data);
                console.log("Order details:", response.data);
                setLoading(false);
            } catch (error) {
                setError("Lỗi khi tải chi tiết sản phẩm trong đơn hàng.");
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [maDonhang]); // Chạy lại khi `maDonhang` thay đổi

    if (loading) {
        return <div>Đang tải chi tiết đơn hàng...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!orderDetails.length) {
        return <div>Không có sản phẩm trong đơn hàng này.</div>;
    }

    return (
        <div className="order-detail">
            <h2>Chi tiết đơn hàng</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá bán</th>
                        <th>Tổng tiền</th>
                        <th>Hình ảnh</th>
                    </tr>
                </thead>
                <tbody>
                    {orderDetails.map((item) => (
                        <tr key={item.chiTietDonHang}>
                            <td>{item.tenSach}</td>
                            <td>{item.soLuong} </td>
                            <td>{item.giaBan} VND</td>
                            <td>{item.soLuong * item.giaBan} VND</td>
                            <td>
                                {item.hinhAnh.map((img, index) => (
                                    <img key={index} src={img} alt={`Hình ảnh sản phẩm ${index}`} style={{ width: 50, height: 50, marginRight: 5 }} />
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderDetailPage;
