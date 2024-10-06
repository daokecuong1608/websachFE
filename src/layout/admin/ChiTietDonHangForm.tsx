import React, { FormEvent, useState } from 'react';
import "./css/ChiTietDonHang.css";
import RequireAdmin from './RequireAdmin';

const ChiTietDonHangForm: React.FC = () => {
    const [chiTietDonHang, setChiTietDonHang] = useState({
        chiTietDonHang: '',
        soLuong: '',
        giaBan: ''
    });
    const [errors, setErrors] = useState({
        chiTietDonHang: '',
        soLuong: '',
        giaBan: ''
    });
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        fetch(
            ' http://localhost:8080/chi-tiet-don-hang',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(chiTietDonHang)
            }
        ).then((reponse) => {
            console.log("aaa" + reponse);
            if (reponse.ok) {
                alert('Thêm chi tiết đơn hàng thành công');
                setChiTietDonHang({
                    chiTietDonHang: '',
                    soLuong: '',
                    giaBan: ''
                })
            } else {
                alert('Thêm chi tiết đơn hàng thất bại');
            }
        }
        )
    }
    return (
        <form className="chi-tiet-don-hang-form" onSubmit={handleSubmit}>
            <div>
                <input
                    type="hidden"
                    id="chiTietDonHang"
                    name="chiTietDonHang"
                    value={chiTietDonHang.chiTietDonHang}
                />
            </div>

            <div>
                <label htmlFor="soLuong">Số Lượng:</label>
                <input
                    type="number"
                    id="soLuong"
                    name="soLuong"
                    value={chiTietDonHang.soLuong}
                    onChange={(e) => setChiTietDonHang({ ...chiTietDonHang, soLuong: e.target.value })} />

            </div>

            <div>
                <label htmlFor="giaBan">Giá Bán:</label>
                <input
                    type="number"
                    id="giaBan"
                    name="giaBan"
                    value={chiTietDonHang.giaBan}
                    onChange={(e) => setChiTietDonHang({ ...chiTietDonHang, giaBan: e.target.value })}
                />

            </div>
            <button type="submit">Thêm Chi tiết đơn hàng </button>
        </form>
    );
};
const ChiTietDonHangForm_Admin = RequireAdmin(ChiTietDonHangForm)
export default ChiTietDonHangForm_Admin;