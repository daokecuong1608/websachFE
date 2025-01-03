import React, { FormEvent, useState } from 'react';
import RequireAdmin from './RequireAdmin';
import useAuth from '../../utils/useAuth';
import './css/SachForm.css'; // Import file CSS riêng cho form

const SachForm: React.FC = () => {
    useAuth();
    const [sach, setSach] = useState({
        maSach: '0',
        tenSach: '',
        IBNS: '',
        giaBan: 0,
        giaNiemYet: 0,
        moTa: '',
        soLuong: 0,
        tenTacGia: '',
        trungBinhXepHang: 0,
    });

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        fetch('http://localhost:8080/sach', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(sach)
        }).then((response) => {
            if (response.ok) {
                alert('Thêm sách thành công');
                setSach({
                    maSach: '0',
                    tenSach: '',
                    IBNS: '',
                    giaBan: 0,
                    giaNiemYet: 0,
                    moTa: '',
                    soLuong: 0,
                    tenTacGia: '',
                    trungBinhXepHang: 0,
                });
            } else {
                alert('Thêm sách thất bại');
            }
        });
    };

    return (
        <div className="sach-form-container">
            <div className="sach-form-wrapper">
                <h1>Thêm Sách</h1>
                <form onSubmit={handleSubmit} className="sach-form">
                    <input type="hidden" name="sachForm_maSach" value={sach.maSach} />

                    <div className="sach-form-group sach-tenSach-group">
                        <label htmlFor="sachForm_tenSach">Tên sách</label>
                        <input
                            className="sach-input sach-tenSach-input"
                            type="text"
                            name="sachForm_tenSach"
                            id="sachForm_tenSach"
                            value={sach.tenSach}
                            required
                            onChange={(e) => setSach({ ...sach, tenSach: e.target.value })}
                        />
                    </div>

                    <div className="sach-form-group sach-giaBan-group">
                        <label htmlFor="sachForm_giaBan">Giá bán</label>
                        <input
                            className="sach-input sach-giaBan-input"
                            type="number"
                            name="sachForm_giaBan"
                            id="sachForm_giaBan"
                            value={sach.giaBan}
                            required
                            onChange={(e) => setSach({ ...sach, giaBan: +e.target.value })}
                        />
                    </div>

                    <div className="sach-form-group sach-giaNiemYet-group">
                        <label htmlFor="sachForm_giaNiemYet">Giá niêm yết</label>
                        <input
                            className="sach-input sach-giaNiemYet-input"
                            type="number"
                            name="sachForm_giaNiemYet"
                            id="sachForm_giaNiemYet"
                            value={sach.giaNiemYet}
                            required
                            onChange={(e) => setSach({ ...sach, giaNiemYet: +e.target.value })}
                        />
                    </div>

                    <div className="sach-form-group sach-moTa-group">
                        <label htmlFor="sachForm_moTa">Mô tả</label>
                        <textarea
                            className="sach-input sach-moTa-input"
                            name="sachForm_moTa"
                            id="sachForm_moTa"
                            value={sach.moTa}
                            required
                            onChange={(e) => setSach({ ...sach, moTa: e.target.value })}
                        />
                    </div>

                    <div className="sach-form-group sach-soLuong-group">
                        <label htmlFor="sachForm_soLuong">Số lượng</label>
                        <input
                            className="sach-input sach-soLuong-input"
                            type="number"
                            name="sachForm_soLuong"
                            id="sachForm_soLuong"
                            value={sach.soLuong}
                            required
                            onChange={(e) => setSach({ ...sach, soLuong: +e.target.value })}
                        />
                    </div>

                    <div className="sach-form-group sach-tenTacGia-group">
                        <label htmlFor="sachForm_tenTacGia">Tên tác giả</label>
                        <input
                            className="sach-input sach-tenTacGia-input"
                            type="text"
                            name="sachForm_tenTacGia"
                            id="sachForm_tenTacGia"
                            value={sach.tenTacGia}
                            required
                            onChange={(e) => setSach({ ...sach, tenTacGia: e.target.value })}
                        />
                    </div>

                    <div className="sach-form-group sach-trungBinhXepHang-group">
                        <label htmlFor="sachForm_trungBinhXepHang">Trung bình xếp hạng</label>
                        <input
                            className="sach-input sach-trungBinhXepHang-input"
                            type="number"
                            name="sachForm_trungBinhXepHang"
                            id="sachForm_trungBinhXepHang"
                            value={sach.trungBinhXepHang}
                            required
                            onChange={(e) => setSach({ ...sach, trungBinhXepHang: +e.target.value })}
                        />
                    </div>

                    <div className="sach-form-group sach-IBNS-group">
                        <label htmlFor="sachForm_IBNS">IBNS</label>
                        <input
                            className="sach-input sach-IBNS-input"
                            type="text"
                            name="sachForm_IBNS"
                            id="sachForm_IBNS"
                            value={sach.IBNS}
                            required
                            onChange={(e) => setSach({ ...sach, IBNS: e.target.value })}
                        />
                    </div>

                    <button type="submit" className="sach-btn sach-submit-btn">Thêm sách</button>
                </form>
            </div>
        </div>
    );
};

const SachForm_Admin = RequireAdmin(SachForm);
export default SachForm_Admin;
