import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./css/CartPage.css";
import request from "../../utils/request"
import { getCart } from "../../api/Cart";

const CartPage = () => {
    const location = useLocation();
    const initialGioHang = location.state?.gioHang || [];
    const [gioHang, setGioHang] = useState(initialGioHang);
    const navigate = useNavigate();


    useEffect(() => {

        fetchCart();
    }, [navigate]);

    const fetchCart = async () => {
        const maNguoiDung = parseInt(localStorage.getItem('userId') || '0');
        if (maNguoiDung > 0) {
            try {
                const data = await getCart(maNguoiDung);
                setGioHang(data || []);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu giỏ hàng:", error);
            }
        } else {
            console.error("Người dùng chưa đăng nhập");
            navigate("/dangNhap");
        }
    };

    const updateCartItemOnServer = async (index: number, soLuong: number) => {
        const item = gioHang[index];
        console.log("item", item);
        console.log("Dữ liệu gửi đi:", {
            chiTietDonHangId: item.chiTietDonHang,
            soLuong: soLuong
        });
        try {
            // Gửi yêu cầu PUT đến API để cập nhật giỏ hàng
            const response = await request.put("api/cart", {
                chiTietDonHangId: item.chiTietDonHang, // Mã chi tiết đơn hàng
                soLuong: soLuong // Số lượng mới
            });
            console.log("Phản hồi từ server:", response.data);

            const maNguoiDung = parseInt(localStorage.getItem('userId') || '0');
            const updatedCart = await getCart(maNguoiDung);

            setGioHang(updatedCart);
            console.log("Cập nhật giỏ hàng sau khi:", updatedCart);
        } catch (error) {
            console.error("Lỗi khi cập nhật sản phẩm trong giỏ hàng", error);
        }

    }
    const handleDelete = async (index: number) => {
        const item = gioHang[index];

        const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${item.tenSach}" khỏi giỏ hàng không?`);
        if (!confirmDelete) {
            // Người dùng chọn "Hủy"
            return;
        }


        try {
            // Gửi yêu cầu DELETE đến API
            const response = await request.delete("api/cart", {
                params: { id: item.chiTietDonHang }, // Gửi `id` như tham số
            });
            // Gọi lại API để lấy dữ liệu mới nhất
            const maNguoiDung = parseInt(localStorage.getItem('userId') || '0');
            const updatedCart = await getCart(maNguoiDung);

            setGioHang(updatedCart);
            console.log("Cập nhật giỏ hàng sau khi xóa:", updatedCart);

        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm trong giỏ hàng", error);
        }
    };


    const handleIncrease = (index: number) => {
        const updateCart = [...gioHang];
        updateCart[index].soLuong++;
        setGioHang(updateCart);
        console.log("tang");
        // Cập nhật số lượng trên server
        updateCartItemOnServer(index, updateCart[index].soLuong);
    };

    const handleDecrease = (index: number) => {
        const updateCart = [...gioHang];
        updateCart[index].soLuong--;
        if (updateCart[index].soLuong <= 0) {
            updateCart.splice(index, 1);
        }
        setGioHang(updateCart);
        console.log("giam");
        // Cập nhật số lượng trên server
        updateCartItemOnServer(index, updateCart[index].soLuong);
    };

    const handleOrder = () => {

    }

    return (
        <div className="cart-container">
            <h1 className="cart-title">Giỏ hàng</h1>
            {gioHang.length > 0 ? (
                <table className="cart-table">
                    <thead>
                        <tr>
                            <th>Tên Sách</th>
                            <th>Số Lượng</th>
                            <th>Giá Bán</th>
                            <th>Hình Ảnh</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gioHang.map((item: any, index: number) => (
                            <tr key={index}>
                                <td>{item.tenSach}</td>
                                <td>
                                    <div className="cart-quantity">
                                        <button onClick={() => handleDecrease(index)}>-</button>
                                        <span>{item.soLuong}</span>
                                        <button onClick={() => handleIncrease(index)}>+</button>
                                    </div>
                                </td>
                                <td>{item.giaBan.toLocaleString()} VND</td>
                                <td>
                                    <div className="cart-images">
                                        {(item.hinhAnh && item.hinhAnh.length > 0
                                            ? item.hinhAnh
                                            : ["https://cafeandbooks.wordpress.com/wp-content/uploads/2015/07/dscn4570.jpg"]
                                        ).map((link: string, imgIndex: number) => (
                                            <img
                                                key={imgIndex}
                                                src={link}
                                                alt={`${item.tenSach} - ${imgIndex}`}
                                                style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                            />
                                        ))}
                                    </div>
                                </td>
                                <td>
                                    <a onClick={() => handleDelete(index)} >Xóa</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            ) : (
                <p className="cart-empty-message">Giỏ hàng của bạn trống</p>
            )}
            <div className="cart-actions">
                <button className="order-button" onClick={handleOrder}>Đặt hàng</button>
            </div>
        </div>
    );
};

export default CartPage;
