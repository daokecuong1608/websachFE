import React, { useEffect, useState } from "react";
import SachModel from "../../models/SachModel";
import SachProps from "./components/SachProps";
import { Phantrang } from "../utlis/PhanTrang";
import { layToanBoSach } from "../../api/SachAPI";

const DanhSachSanPham: React.FC = () => {

    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const [trangHienTai, setTrangHienTai] = useState(1);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [tongSoSach, setTongSoSach] = useState(0);
    //chỉ gọi 1 lần duy nhất khi component được render
    useEffect(() => {
        layToanBoSach(trangHienTai - 1).then(
            kq => {
                setDanhSachQuyenSach(kq.ketQua);//gán gia trị mà mình lấy được từ server vào danhSachQuyenSach
                setTongSoTrang(kq.tongSoTrang);
                setDangTaiDuLieu(false);//đã tải xong dữ liệu
            }
        ).catch(
            error => {
                setDangTaiDuLieu(false);
                setBaoLoi(error.message);
            }
        )

    }, [trangHienTai])

    const phanTrang = (trang: number) => {
        setTrangHienTai(trang);
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
            <Phantrang
                trangHienTai={trangHienTai}
                tongSoTrang={tongSoTrang}
                phanTrang={phanTrang} />
        </div>
    );
}
export default DanhSachSanPham;
