import React, { FormEvent, useState } from 'react';
import RequireAdmin from "./RequireAdmin";
import "./css/DonHangForm.css";

const DonHangForm = () => {
    const [formData, setFormData] = useState({
        maDonHang: '',
        ngayTao: '',
        diaChiMuaHang: '',
        tongTienSanPham: '',
        chiPhiGiaoHang: '',
        tongTien: ''
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        fetch(
            'http://localhost:8080/don-hang',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            }
        ).then((response) => {
            console.log("aaa=>" + response);
            if (response.ok) {
                alert('Thêm đơn hàng thành công');
                setFormData({
                    maDonHang: '',
                    ngayTao: '',
                    diaChiMuaHang: '',
                    tongTienSanPham: '',
                    chiPhiGiaoHang: '',
                    tongTien: ''
                });
            } else {
                alert('Thêm đơn hàng thất bại');
            }
        });
    };

    return (
        <div className="form-container-dh">
            <h1>Thêm Đơn Hàng</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-section-dh">
                    <div className="form-group-dh">
                        <input
                            type="hidden"
                            name="maDonHang"
                            value={formData.maDonHang}
                        />
                    </div>
                    <div className="form-group-dh">
                        <label>Ngày tạo :</label>
                        <input
                            type="date"
                            name="ngayTao"
                            value={formData.ngayTao}
                            onChange={(e) => setFormData({ ...formData, ngayTao: e.target.value })}
                        />
                    </div>
                    <div className="form-group-dh">
                        <label>Địa chỉ mua hàng :</label>
                        <input
                            type="text"
                            name="diaChiMuaHang"
                            value={formData.diaChiMuaHang}
                            onChange={(e) => setFormData({ ...formData, diaChiMuaHang: e.target.value })}
                        />
                    </div>
                </div>
                <div className="form-section-dh">
                    <div className="form-group-dh">
                        <label>Tổng tiền sản phẩm :</label>
                        <input
                            type="number"
                            name="tongTienSanPham"
                            value={formData.tongTienSanPham}
                            onChange={(e) => setFormData({ ...formData, tongTienSanPham: e.target.value })}
                        />
                    </div>
                    <div className="form-group-dh">
                        <label>Chi phí giao hàng :</label>
                        <input
                            type="number"
                            name="chiPhiGiaoHang"
                            value={formData.chiPhiGiaoHang}
                            onChange={(e) => setFormData({ ...formData, chiPhiGiaoHang: e.target.value })}
                        />
                    </div>
                    <div className="form-group-dh">
                        <label>Tổng tiền :</label>
                        <input
                            type="number"
                            name="tongTien"
                            value={formData.tongTien}
                            onChange={(e) => setFormData({ ...formData, tongTien: e.target.value })}
                        />
                    </div>
                </div>
                <div className="form-group-dh submit-group-dh">
                    <button type="submit" className="submit-button-dh">Thêm Đơn Hàng</button>
                </div>
            </form>
        </div>
    );
};

const DonHangForm_Admin = RequireAdmin(DonHangForm);
export default DonHangForm_Admin;