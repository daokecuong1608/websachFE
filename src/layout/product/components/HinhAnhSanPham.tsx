import React, { useEffect, useState } from "react";
import SachModel from "../../../models/SachModel";
import HinhAnhModel from "../../../models/HinhAnhModels";
import { lay_1_AnhCuaMotSach, layToanBoAnhCuaMotSach } from "../../../api/HinhAnhApi";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";

interface HinhAnhSanPham {
    maSach: number;
}

const HinhAnhSanPham: React.FC<HinhAnhSanPham> = (props) => {

    const maSach: number = props.maSach;

    const [danhSachHinhAnh, setDanhSachHinhAnh] = useState<HinhAnhModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const [hinhAnhDangChon, setHinhAnhDangChon] = useState<HinhAnhModel | null>(null);

    const chonHinhAnh = (hinhAnh: HinhAnhModel) => {
        setHinhAnhDangChon(hinhAnh);
    }


    useEffect(() => {
        layToanBoAnhCuaMotSach(maSach).then(
            danhSach => {
                setDanhSachHinhAnh(danhSach);
                if (danhSach.length > 0) {
                    setHinhAnhDangChon(danhSach[0]);
                }
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
        <div className="col-md-3 mt-2">
            <div>

                {(hinhAnhDangChon) && <img src={hinhAnhDangChon.duLieuAnh} />}
            </div>
            <div className="row mt-2">
                {
                    danhSachHinhAnh.map((hinhAnh, index) => (
                        <div key={index} className={"col-3"} >
                            <img src={hinhAnh.duLieuAnh} style={{ width: '50px' }} onClick={() => chonHinhAnh(hinhAnh)} />
                        </div>
                    )
                    )
                }

            </div>
        </div>
    );
}
export default HinhAnhSanPham;