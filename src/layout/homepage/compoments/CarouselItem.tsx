import React, { useEffect, useState } from "react";
import SachModel from "../../../models/SachModel";
import HinhAnhModel from "../../../models/HinhAnhModels";
import { lay_1_AnhCuaMotSach } from "../../../api/HinhAnhApi";
import renderRating from "../../utlis/RenderRating";
import DinhDangSo from "../../utlis/DinhDangSo";

interface CarouselItemInterface {
    sach: SachModel;
}

const CarouselItem: React.FC<CarouselItemInterface> = (props) => {

    const maSach: number = props.sach.maSach;

    const [danhSachHinhAnh, setDanhSachHinhAnh] = useState<HinhAnhModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);

    useEffect(() => {
        lay_1_AnhCuaMotSach(maSach).then(
            hinhAnhData => {
                setDanhSachHinhAnh(hinhAnhData);
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

    let duLieuHinhAnh: string = "";
    if (danhSachHinhAnh[0] && danhSachHinhAnh[0].duLieuAnh) {
        duLieuHinhAnh = danhSachHinhAnh[0].duLieuAnh;
    }

    return (

        <div className="row align-items-center">
            <div className="col-5 text-center">
                <img src={duLieuHinhAnh} className="float-end" style={{ width: '200px' }} />
            </div>
            <div className="col-7">
                <h5>{props.sach.tenSach}</h5>
                <p> Giá bán :  {DinhDangSo(props.sach.giaBan ? props.sach.giaBan : 0)}</p>
                <p>Tác giả :  {props.sach.tenTacGia}</p>
                {/* <p>{props.sach.moTa}</p> */}
            </div>
        </div>

    );
}
export default CarouselItem;