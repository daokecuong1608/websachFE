import { FormEvent, useState } from "react";
import RequireAdmin from "./RequireAdmin";
import "./css/HinhThucGiaoHang.css";

const HinhThucGiaoHangForm: React.FC = (props) => {
    const [hinhThucGiaoHang, setHinhThucGiaoHang] = useState({
        maHinhThucGiaoHang: '0',
        tenHinhThucGiaoHang: '',
        moTa: '',
        chiPhiGiaoHang: 0
    });

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        fetch(
            'http://localhost:8080/hinh-thuc-giao-hang',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(hinhThucGiaoHang)
            }
        ).then((response) => {
            console.log("aaa" + response);
            if (response.ok) {
                alert('Thêm hình thức giao hàng thành công');
                setHinhThucGiaoHang({
                    maHinhThucGiaoHang: '0',
                    tenHinhThucGiaoHang: '',
                    moTa: '',
                    chiPhiGiaoHang: 0
                });
            } else {
                alert('Thêm hình thức giao hàng thất bại');
            }
        });
    };

    return (
        <div className="form-container-htgh">
            <form onSubmit={handleSubmit}>
                <div className="form-group-htgh">
                    <input type="hidden" placeholder="Tên hình thức giao hàng" />
                </div>
                <div className="form-group-htgh">
                    <label htmlFor="tenHinhThucGiaoHang">Tên hình thức giao hàng:</label>
                    <input
                        type="text"
                        placeholder="Tên hình thức giao hàng"
                        name="tenHinhThucGiaoHang"
                        id="tenHinhThucGiaoHang"
                        value={hinhThucGiaoHang.tenHinhThucGiaoHang}
                        onChange={(e) => setHinhThucGiaoHang({ ...hinhThucGiaoHang, tenHinhThucGiaoHang: e.target.value })}
                    />
                </div>

                <div className="form-group-htgh">
                    <label htmlFor="chiPhiGiaoHang">Chi phí giao hàng:</label>
                    <input
                        type="number"
                        placeholder="Chi phí giao hàng:"
                        name="chiPhiGiaoHang"
                        id="chiPhiGiaoHang"
                        value={hinhThucGiaoHang.chiPhiGiaoHang}
                        onChange={(e) => setHinhThucGiaoHang({ ...hinhThucGiaoHang, chiPhiGiaoHang: Number(e.target.value) })}
                    />
                </div>

                <div className="form-group-htgh">
                    <label htmlFor="moTa">Mô tả:</label>
                    <input
                        type="text"
                        placeholder="Mô tả"
                        name="moTa"
                        id="moTa"
                        value={hinhThucGiaoHang.moTa}
                        onChange={(e) => setHinhThucGiaoHang({ ...hinhThucGiaoHang, moTa: e.target.value })}
                    />
                </div>

                <button type="submit" className="submit-button-htgh">Thêm hình thức giao hàng</button>
            </form>
        </div>
    );
};

const HinhThucGiaoHang_Admin = RequireAdmin(HinhThucGiaoHangForm);
export default HinhThucGiaoHang_Admin;