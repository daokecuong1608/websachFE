import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SachModel from "../../models/SachModel";
import { laySachTheoMaSach } from "../../api/SachAPI";
import { error } from "console";
import HinhAnhSanPham from "./components/HinhAnhSanPham";
import DanhGiaSanPham from "./components/DanhGiaSanPham";
import renderRating from "../utlis/RenderRating";
import DinhDangSo from "../utlis/DinhDangSo";




const ChiTietSanPham: React.FC = () => {

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