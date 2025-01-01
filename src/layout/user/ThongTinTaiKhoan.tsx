import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "../../utils/request";
import "./css/ThongTinTaiKhoan.css";

interface UserDetails {
    diaChiGiaoHang: string;
    diaChiMuaHang: string;
    email: string;
    gioiTinh: string;
    hoDem: string;
    matKhau: string;
    soDienThoai: string;
    ten: string;
    tenDangNhap: string;
}

const ThongTinTaiKhoan = () => {
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState<UserDetails>({
        diaChiGiaoHang: "",
        diaChiMuaHang: "",
        email: "",
        gioiTinh: "",
        hoDem: "",
        matKhau: "",
        soDienThoai: "",
        ten: "",
        tenDangNhap: "",
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!userId) {
            navigate("/dangNhap");
            return;
        }
        fetchUserDetails(Number(userId));
    }, [userId]);

    const fetchUserDetails = async (userId: number) => {
        try {
            const response = await request.get(`/api/nguoi-dung/${userId}`);
            setUserDetails(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy thông tin tài khoản:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserDetails((prev) => ({ ...prev, [name]: value }));
    };




    const handleSave = async () => {
        try {
            const response = await request.put(`/api/nguoi-dung/${userId}`, userDetails);
            alert("Cập nhật thông tin thành công!");
            setIsEditing(false);
        } catch (error) {
            console.error("Lỗi khi lưu thông tin:", error);
            alert("Đã xảy ra lỗi khi lưu thông tin.");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Thông tin tài khoản</h2>
            <div className="card p-4">
                <div className="form-container">
                    <div className="form-group">
                        <label className="form-label">Họ đệm:</label>
                        <input
                            className="form-control"
                            type="text"
                            name="hoDem"
                            value={userDetails.hoDem}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Tên:</label>
                        <input
                            className="form-control"
                            type="text"
                            name="ten"
                            value={userDetails.ten}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Giới tính:</label>
                        <input
                            className="form-control"
                            type="text"
                            name="gioiTinh"
                            value={userDetails.gioiTinh}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email:</label>
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            value={userDetails.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Số điện thoại:</label>
                        <input
                            className="form-control"
                            type="text"
                            name="soDienThoai"
                            value={userDetails.soDienThoai}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Tên đăng nhập:</label>
                        <input
                            className="form-control"
                            type="text"
                            name="tenDangNhap"
                            value={userDetails.tenDangNhap}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Mật khẩu:</label>
                        <input
                            className="form-control"
                            type="password"
                            name="matKhau"
                            value={userDetails.matKhau}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Địa chỉ mua hàng:</label>
                        <input
                            className="form-control"
                            type="text"
                            name="diaChiMuaHang"
                            value={userDetails.diaChiMuaHang}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Địa chỉ giao hàng:</label>
                        <input
                            className="form-control"
                            type="text"
                            name="diaChiGiaoHang"
                            value={userDetails.diaChiGiaoHang}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                </div>
                <div className="form-actions">
                    {isEditing ? (
                        <button className="btn btn-success" onClick={handleSave}>
                            Lưu thay đổi
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary"
                            onClick={() => setIsEditing(true)}
                        >
                            Chỉnh sửa
                        </button>
                    )}
                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate(-1)}
                    >
                        Quay lại
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThongTinTaiKhoan;
