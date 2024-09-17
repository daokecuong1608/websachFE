import React, { useEffect, useState } from "react";
import SachModel from "../../models/SachModel";
import SachProps from "./components/SachProps";
import { Phantrang } from "../utlis/PhanTrang";
import { layToanBoSach, timKiemSach } from "../../api/SachAPI";

interface DanhSachSanPhamProps {
    tuKhoaTimKiem: string;
    maTheLoai: number;
}

const DanhSachSanPham = ({ tuKhoaTimKiem, maTheLoai }: DanhSachSanPhamProps) => {


    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const [trangHienTai, setTrangHienTai] = useState(1);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [tongSoSach, setTongSoSach] = useState(0);
    //chỉ gọi 1 lần duy nhất khi component được render
    useEffect(() => {

        if (tuKhoaTimKiem === '' && maTheLoai == 0) {

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
        } else {
            timKiemSach(tuKhoaTimKiem, maTheLoai).then(
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
        }
    }, [trangHienTai, tuKhoaTimKiem, maTheLoai])

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

    if (danhSachQuyenSach.length === 0) {
        return (
            <div className="container">
                <div className="f-flex align-items-center justify-content-center">
                    <h1>Không tìm thấy sách theo yêu cầu!</h1>
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="row mt-4 mb-4">
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
