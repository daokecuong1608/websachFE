import React, { useEffect, useState } from "react";
import SachModel from "../../models/SachModel";
import SachProps from "./components/SachProps";
import { layToanBoSach } from "../../api/SachAPI";
import { error } from "console";

const DanhSachSanPham: React.FC = () => {

    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);

    //chỉ gọi 1 lần duy nhất khi component được render
    useEffect(() => {
        layToanBoSach().then(
            sachData => {
                setDanhSachQuyenSach(sachData);
                setDangTaiDuLieu(false);
            }
        ).catch(
            error => {
                setBaoLoi(error.message);
            }
        )

    }, [])

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


        <div className="container">
            <div className="row mt-4">
                {
                    danhSachQuyenSach.map((sach, index) => {
                        return (
                            <SachProps sach={sach} key={sach.maSach} />
                        )
                    })
                }
            </div>
        </div>
    );
}
export default DanhSachSanPham;
