import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import request from "../../utils/request";
import "./css/OrderDetailsPage.css"; // Make sure to import your CSS

interface CartItem {
    maSach: number;
    tenSach: string;
    giaBan: number;
    soLuong: number;
    hinhAnh: string;  // New field for the product image URL
}

interface ShippingMethod {
    maHinhThucGiaoHang: number;
    tenHinhThucGiaoHang: string;
    chiPhiGiaoHang: number;
}

interface PaymentMethod {
    maHinhThucThanhToan: number;
    tenHinhThucThanhToan: string;
    chiPhiThanhToan: number;
}

const OrderDetailsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [gioHang, setGioHang] = useState<CartItem[]>(location.state?.gioHang || []);
    const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [selectedShipping, setSelectedShipping] = useState<string>("");
    const [selectedPayment, setSelectedPayment] = useState<string>("");
    const [selectedShippingName, setSelectedShippingName] = useState<string>("");
    const [selectedPaymentName, setSelectedPaymentName] = useState<string>("");
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [diaChiNhanHang, setDiaChiNhanHang] = useState<string>("");

    console.log("gioHang", gioHang);

    useEffect(() => {
        fetchShippingMethods();
        fetchPaymentMethods();
        calculateTotalPrice();
    }, [gioHang]);

    useEffect(() => {
        calculateTotalPrice();
    }, [selectedShipping, selectedPayment]);

    const fetchShippingMethods = async () => {
        try {
            const response = await request.get("/api/hinh-thuc-giao-hang");
            setShippingMethods(response.data);
        } catch (error) {
            console.error("Error fetching shipping methods:", error);
        }
    };

    const fetchPaymentMethods = async () => {
        try {
            const response = await request.get("/api/hinh-thuc-thanh-toan");
            setPaymentMethods(response.data);
        } catch (error) {
            console.error("Error fetching payment methods:", error);
        }
    };

    const calculateTotalPrice = () => {
        const totalProductPrice = gioHang.reduce((acc, item) => {
            const giaBan = item.giaBan || 0;
            const soLuong = item.soLuong || 0;
            return acc + giaBan * soLuong;
        }, 0);

        const shippingCost = shippingMethods.find(
            (method) => method.maHinhThucGiaoHang.toString() === selectedShipping
        )?.chiPhiGiaoHang || 0;

        const paymentCost = paymentMethods.find(
            (method) => method.maHinhThucThanhToan.toString() === selectedPayment
        )?.chiPhiThanhToan || 0;

        const total = totalProductPrice + shippingCost + paymentCost;
        setTotalPrice(total);
    };

    const handleShippingChange = (id: string) => {
        setSelectedShipping(id);
        const method = shippingMethods.find(
            (method) => method.maHinhThucGiaoHang.toString() === id
        );
        if (method) setSelectedShippingName(method.tenHinhThucGiaoHang);
    };

    const handlePaymentChange = (id: string) => {
        setSelectedPayment(id);
        const method = paymentMethods.find(
            (method) => method.maHinhThucThanhToan.toString() === id
        );
        if (method) setSelectedPaymentName(method.tenHinhThucThanhToan);
    };

    const handleOrderSubmit = async () => {
        if (!selectedShipping || !selectedPayment || !diaChiNhanHang) {
            alert("Vui lòng chọn hình thức giao hàng, phương thức thanh toán và nhập địa chỉ nhận hàng.");
            return;
        }

        const shippingCost = shippingMethods.find((method) =>
            method.maHinhThucGiaoHang.toString() === selectedShipping)?.chiPhiGiaoHang || 0;


        const paymentCost = paymentMethods.find((method) =>
            method.maHinhThucThanhToan.toString() === selectedPayment)?.chiPhiThanhToan || 0;

        const totalProductCost = gioHang.reduce((acc, item) => acc + item.giaBan * item.soLuong, 0);


        const nguoiDungId = location.state?.nguoiDungId || localStorage.getItem("userId") || "";

        console.log("nguoiDungId : ", nguoiDungId);
        console.log("maHinhThucGiaoHang : ", selectedShipping);
        console.log("maHinhThucThanhToan : ", selectedPayment);


        const cartItems: CartItem[] = gioHang.map(item => ({
            maSach: item.maSach,
            tenSach: item.tenSach,
            giaBan: item.giaBan,
            soLuong: item.soLuong,
            hinhAnh: item.hinhAnh, // Include product image URL
        }));
        console.log("cartItems : ", cartItems);
        const orderData = {
            ngayTao: new Date().toISOString(),
            diaChiNhanHang,
            tongTienSanPham: totalProductCost,
            chiPhiGiaoHang: shippingCost,
            chiPhiThanhToan: paymentCost,
            nguoiDungId,
            maHinhThucGiaoHang: selectedShipping, // Thêm trường maHinhThucGiaoHang
            maHinhThucThanhToan: selectedPayment, // Thêm trường maHinhThucThanhToan
            tongTien: totalProductCost + shippingCost + paymentCost,
            trangThai: "CHUA_HOAN_TAT",
            cartItems, // Added the cartItems array
        };
        console.log("orderData : ", orderData);
        try {
            const response = await request.post("/api/don-hang", orderData);
            const maDonHang = response.data.maDonHang;  // Lấy mã đơn hàng từ phản hồi
            console.log("Order placed successfully with order ID:", maDonHang);
            alert("Đặt hàng thành công!");
            navigate(`/order-confirmation/${response.data.maDonHang}`);
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.");
        }
    };

    return (
        <div className="order-details">
            <div className="order-left">
                <h2 className="order-title">Chi tiết đơn hàng</h2>
                <h3 className="cart-title">Sản phẩm trong giỏ hàng</h3>
                <table className="cart-table">
                    <thead>
                        <tr>
                            <th>Ảnh sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Đơn giá</th>
                            <th>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gioHang.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <img src={item.hinhAnh} alt={item.tenSach} className="product-image" />
                                </td>
                                <td>{item.tenSach}</td>
                                <td>{item.soLuong}</td>
                                <td>{item.giaBan?.toLocaleString() || "0"} VND</td>
                                <td>
                                    {(item.giaBan && item.soLuong ? item.giaBan * item.soLuong : 0).toLocaleString()} VND
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h3 className="total-price">Tổng tiền: {totalPrice.toLocaleString()} VND</h3>
            </div>

            <div className="order-right">
                <div className="shipping-section">
                    <h2 className="shipping-title">Chọn hình thức giao hàng</h2>
                    <div className="shipping-methods">
                        {shippingMethods.map((method) => (
                            <label key={method.maHinhThucGiaoHang} className="shipping-method-label">
                                <input
                                    type="radio"
                                    name="shippingMethod"
                                    value={method.maHinhThucGiaoHang.toString()}
                                    checked={selectedShipping === method.maHinhThucGiaoHang.toString()}
                                    onChange={() => handleShippingChange(method.maHinhThucGiaoHang.toString())}
                                />
                                {method.tenHinhThucGiaoHang} - {method.chiPhiGiaoHang?.toLocaleString() || "0"} VND
                            </label>
                        ))}
                    </div>
                    {/* {selectedShippingName && <p className="selected-shipping">Hình thức giao hàng đã chọn: {selectedShippingName}</p>} */}
                </div>

                <div className="payment-section">
                    <h2 className="payment-title">Chọn phương thức thanh toán</h2>
                    <div className="payment-methods">
                        {paymentMethods.map((method) => (
                            <label key={method.maHinhThucThanhToan} className="payment-method-label">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value={method.maHinhThucThanhToan.toString()}
                                    checked={selectedPayment === method.maHinhThucThanhToan.toString()}
                                    onChange={() => handlePaymentChange(method.maHinhThucThanhToan.toString())}
                                />
                                {method.tenHinhThucThanhToan} - {method.chiPhiThanhToan?.toLocaleString() || "0"} VND
                            </label>
                        ))}
                    </div>
                    {/* {selectedPaymentName && <p className="selected-payment">Phương thức thanh toán đã chọn: {selectedPaymentName}</p>} */}
                </div>

                <div className="shipping-address-section">
                    <h2 className="address-title">Địa chỉ nhận hàng</h2>
                    <input
                        type="text"
                        value={diaChiNhanHang}
                        onChange={(e) => setDiaChiNhanHang(e.target.value)}
                        placeholder="Nhập địa chỉ nhận hàng"
                        className="address-input"
                    />
                </div>

                <button className="order-submit-button" onClick={handleOrderSubmit}>
                    Đặt hàng
                </button>
            </div>
        </div>

    );
};

export default OrderDetailsPage;
