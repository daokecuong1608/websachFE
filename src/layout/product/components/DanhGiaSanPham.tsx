import React, { useEffect, useState } from "react";
import SachModel from "../../../models/SachModel";
import HinhAnhModel from "../../../models/HinhAnhModels";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { layToanBoDanhGiaCuaMotSach } from "../../../api/DanhGiaAPI";
import DanhGiaModel from "../../../models/DanhGiaModel";

interface DanhGiaSanPham {
    maSach: number;
}

const DanhGiaSanPham: React.FC<DanhGiaSanPham> = (props) => {

    const maSach: number = props.maSach;

    const [danhSachDanhGia, setDanhSachDanhGia] = useState<DanhGiaModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);



    useEffect(() => {
        layToanBoDanhGiaCuaMotSach(maSach).then(
            danhSach => {
                setDanhSachDanhGia(danhSach);
                setDangTaiDuLieu(false);
            }
        ).catch(
            error => {
                setDangTaiDuLieu(false);
                setBaoLoi(error.message);
            }
        )
    }, []
    )

    console.log(danhSachDanhGia.length)

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

    return (
        <div className="container mt-2 mb-2 text-center">
            <h3>Đánh giá sản phẩm</h3>
            {
                danhSachDanhGia.map((danhGia, index) => (
                    <div className="row">
                        <div className="col-4 text-end">
                            <h3>{danhGia.diemXepHang}</h3>
                        </div>
                        <div className="col-8 text-start">
                            <p>{danhGia.nhanXet}</p>
                        </div>
                    </div>

                )
                )
            }

        </div>
    );
}
export default DanhGiaSanPham;