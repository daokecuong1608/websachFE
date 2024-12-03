import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SachModel from "../../models/SachModel";
import { laySachTheoMaSach } from "../../api/SachAPI";
import HinhAnhSanPham from "./components/HinhAnhSanPham";
import DanhGiaSanPham from "./components/DanhGiaSanPham";
import renderRating from "../utlis/RenderRating";
import DinhDangSo from "../utlis/DinhDangSo";
import { addToCart } from "../../api/Cart";
import useAuth from "../../utils/useAuth";
import useAuthLogin from "../../utils/useAuth";




const ChiTietSanPham: React.FC = () => {
    useAuth();

    //lay ma sach tu URl
    const { maSach } = useParams();

    let maSachNumber: number = 0;

    try {
        maSachNumber = parseInt(maSach + "");
        if (Number.isNaN(maSachNumber)) {
            maSachNumber = 0;
        }
    } catch (error) {
        maSachNumber = 0;
        console.error("error:", error);
    }
    //khai bao 
    const [sach, setSach] = useState<SachModel | null>(null);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const [soLuong, setSoLuong] = useState(1);
    const navigate = useNavigate();
    const tangSoLuong = () => {
        const SoLuongHienTai = sach?.soLuong ? sach.soLuong : 0;
        if (soLuong < SoLuongHienTai) {
            setSoLuong(soLuong + 1);
        }
    }
    const giamSoLuong = () => {
        if (soLuong > 2) {
            setSoLuong(soLuong - 1);
        }
    }

    useEffect(() => {
        laySachTheoMaSach(maSachNumber)
            .then(
                (sach) => {
                    setSach(sach);
                    setDangTaiDuLieu(false);
                }
            ).catch(
                (error) => {
                    setBaoLoi(error.message);
                    setDangTaiDuLieu(false);
                }
            );
    }, [maSach]
    )

    const handleThemVaoGioHang = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Vui lòng đăng nhập để thêm vào giỏ hàng.");
            navigate("/login");
        } else {
            if (!sach) {
                return;
            }
            try {
                const message = await addToCart({ maSach: sach.maSach, soLuong: soLuong });
                alert(message); // Hiển thị thông báo thành công
                navigate("/")

            } catch (error: any) {
                alert(error.message || "Lỗi khi thêm vào giỏ hàng."); // Hiển thị lỗi
            }
        }
    }
    const handleMuaNgay = () => {

    }


    const handleSoLuong = (event: React.ChangeEvent<HTMLInputElement>) => {
        const SoLuongToKho = sach?.soLuong ? sach.soLuong : 0;
        const soLuongMoi = parseInt(event.target.value);
        if (!isNaN(soLuongMoi) && soLuongMoi >= 1 && soLuongMoi <= SoLuongToKho) {
            setSoLuong(soLuongMoi);
        }
    }
    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang tải dữ liệu </h1>
            </div>
        )
    }
    if (baoLoi) {
        return (
            <div>
                <h1>Gặp lỗi : {baoLoi}  </h1>
            </div>
        )
    }
    if (!sach) {
        return (
            <div>
                <h1>Không tìm thấy sách</h1>
            </div>
        )
    }


    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col-4 mb-4">
                    <HinhAnhSanPham maSach={maSachNumber} />
                </div>
                <div className="col-8">
                    <div className="row">
                        <div className="col-8">
                            <h1>
                                {sach.tenSach}
                            </h1>
                            <h4>
                                {renderRating(sach.trungBinhXepHang ? sach.trungBinhXepHang : 0)}
                            </h4>
                            <h4>
                                {DinhDangSo(sach.giaBan ? sach.giaBan : 0)}
                            </h4>
                            <hr />
                            <div dangerouslySetInnerHTML={{ __html: (sach.moTa + '') }} />
                            <hr />
                        </div>
                        <div className="col-4">
                            <div>
                                <div className="mb-2">Số lượng : </div>
                                <div className="d-flex align-items-center">
                                    <button className="btn btn-outline-secondary me-2" onClick={giamSoLuong}>  - </button>
                                    <input
                                        className="form-control text-center"
                                        type="number"
                                        value={soLuong}
                                        min={1}
                                        onChange={handleSoLuong}
                                    />
                                    <button className="btn btn-outline-secondary ms-2" onClick={tangSoLuong}> + </button>
                                </div>
                                {
                                    sach.giaBan && (
                                        <div className="mt-2 text-center">
                                            Số tiền tạm tính <br />
                                            <h4>{DinhDangSo(soLuong * sach.giaBan)}</h4>
                                        </div>
                                    )
                                }
                                <div className="d-grid gap-2">
                                    <button type="button"
                                        className="btn btn-outline-secondary mt-3"
                                        onClick={handleThemVaoGioHang}>Thêm vào giỏ hàng</button>
                                    <button type="button" className="btn btn-danger mt-3" onClick={handleMuaNgay}>Mua ngay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <DanhGiaSanPham maSach={maSachNumber} />
            </div>
        </div>
    );
}
export default ChiTietSanPham;