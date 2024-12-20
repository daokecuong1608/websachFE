import React, { useEffect, useState } from "react";
import SachModel from "../../../models/SachModel";
import HinhAnhModel from "../../../models/HinhAnhModels";
import { lay_1_AnhCuaMotSach } from "../../../api/HinhAnhApi";
import { Link, useNavigate } from "react-router-dom";
import renderRating from "../../utlis/RenderRating";
import DinhDangSo from "../../utlis/DinhDangSo";
import { addToCart } from "../../../api/Cart";

interface SachPropsInterface {
    sach: SachModel;
}

const SachProps: React.FC<SachPropsInterface> = ({ sach }) => {
    const [danhSachHinhAnh, setDanhSachHinhAnh] = useState<HinhAnhModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        lay_1_AnhCuaMotSach(sach.maSach)
            .then((hinhAnhData) => {
                setDanhSachHinhAnh(hinhAnhData);
                setDangTaiDuLieu(false);
            })
            .catch((error) => {
                setDangTaiDuLieu(false);
                setBaoLoi(error.message || "Đã xảy ra lỗi không xác định.");
            });
    }, [sach.maSach]);

    const handleThemVaoGioHang = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Vui lòng đăng nhập để thêm vào giỏ hàng.");
            navigate("/login");
        } else {
            try {
                const message = await addToCart({ maSach: sach.maSach, soLuong: 1 });
                alert(message);
                navigate("/");
            } catch (error: any) {
                alert(error.message || "Lỗi khi thêm vào giỏ hàng.");
            }
        }
    };

    if (dangTaiDuLieu) {
        return <div>Đang tải dữ liệu...</div>;
    }

    if (baoLoi) {
        return <div>Gặp lỗi: {baoLoi}</div>;
    }

    const deLieuHinhAnh = danhSachHinhAnh.length > 0 ? danhSachHinhAnh[0].duLieuAnh : "";

    return (
        <div className="col-md-3 mt-2">
            <div className="card">
                <Link to={`/sach/${sach.maSach}`}>
                    <img src={deLieuHinhAnh} className="card-img-top" alt={sach.tenSach} style={{ height: "200px" }} />
                </Link>
                <div className="card-body">
                    <Link to={`/sach/${sach.maSach}`} style={{ textDecoration: "none" }}>
                        <h5 className="card-title">{sach.tenSach}</h5>
                    </Link>
                    <div className="price row">
                        <span className="original-price col-6 text-end">
                            <del>{DinhDangSo(sach.giaNiemYet || 0)}</del>
                        </span>
                        <span className="discounted-price col-6">
                            <strong>{DinhDangSo(sach.giaBan || 0)}</strong>
                        </span>
                    </div>
                    <div className="row mt-2">
                        <div className="col-6">{renderRating(sach.trungBinhXepHang || 0)}</div>
                        <div className="col-6 text-end">
                            <a href="#" className="btn btn-secondary btn-block">
                                <i className="fas fa-heart"></i>
                            </a>
                            <button className="btn btn-danger btn-block" onClick={handleThemVaoGioHang}>
                                <i className="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SachProps;
