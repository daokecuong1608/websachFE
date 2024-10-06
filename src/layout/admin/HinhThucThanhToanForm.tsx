import { FormEvent, useState } from "react";
import RequireAdmin from "./RequireAdmin";
import "./css/HinhThucThanhToan.css";

const HinhThucThanhToanForm = () => {

    const [HinhThucThanhToan, setHinhThucThanhToan] = useState({
        tenHinhThucThanhToan: '',
        moTa: '',
        chiPhiThanhToan: 0
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        fetch(
            'http://localhost:8080/hinh-thuc-thanh-toan',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(HinhThucThanhToan)
            }
        ).then((response) => {
            console.log("aaa" + response);
            if (response.ok) {
                alert('Thêm hình thức thanh toán thành công');
                setHinhThucThanhToan({
                    tenHinhThucThanhToan: '',
                    moTa: '',
                    chiPhiThanhToan: 0
                });

            } else {
                alert('Thêm hình thức thanh toán thất bại');
            }
        }
        )
    }

    return (
        <div className="form-container-httt">
            <h1>Thêm hình thức thanh toán</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group-httt">
                    <input type="hidden" placeholder="Mã hình thức thanh toán" />
                </div>
                <div className="form-group-httt">
                    <label htmlFor="tenHinhThucThanhToan">Tên hình thức thanh toán:</label>
                    <input
                        type="text"
                        placeholder="Tên hình thức thanh toán"
                        name="tenHinhThucThanhToan"
                        id="tenHinhThucThanhToan"
                    />
                </div>
                <div className="form-group-httt">
                    <label htmlFor="moTa">Mô tả:</label>
                    <input
                        type="text"
                        placeholder="Mô tả"
                        name="moTa"
                        id="moTa"
                    />
                </div>
                <div className="form-group-httt">
                    <label htmlFor="chiPhiThanhToan">Chi phí thanh toán:</label>
                    <input
                        type="number"
                        placeholder="Chi phí thanh toán"
                        name="chiPhiThanhToan"
                        id="chiPhiThanhToan"
                    />
                </div>
                <div className="form-group-httt">
                    <button type="submit" className="submit-button-httt">Thêm hình thức thanh toán</button>
                </div>
            </form>
        </div>
    );
};

const HinhThucThanhToan_Admin = RequireAdmin(HinhThucThanhToanForm);
export default HinhThucThanhToan_Admin;