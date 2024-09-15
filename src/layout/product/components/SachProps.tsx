import React, { useEffect, useState } from "react";
import Book from "../../../models/Book";
import SachModel from "../../../models/SachModel";
import HinhAnhModel from "../../../models/HinhAnhModels";
import { layToanBoAnhCuaMotSach } from "../../../api/HinhAnhApi";

interface SachPropsInterface {
    sach: SachModel;
}

const SachProps: React.FC<SachPropsInterface> = (props) => {

    const maSach: number = props.sach.maSach;

    const [danhSachHinhAnh, setDanhSachHinhAnh] = useState<HinhAnhModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);

    useEffect(() => {

        layToanBoAnhCuaMotSach(maSach).then(
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

    let deLieuHinhAnh: string = "";
    if (danhSachHinhAnh[0] && danhSachHinhAnh[0].duLieuAnh) {
        deLieuHinhAnh = danhSachHinhAnh[0].duLieuAnh;
    }

    return (
        <div className="col-md-3 mt-2">
            <div className="card">

                <img
                    src={deLieuHinhAnh}
                    className="card-img-top"
                    alt={props.sach.tenSach}
                    style={{ height: "200px" }}
                />
                <div className="card-body">
                    <h5 className="card-title">{props.sach.tenSach}</h5>
                    <p className="card-text">{props.sach.moTa}</p>
                    <div className="price row">
                        <span className="original-price col-6 text-end">
                            <del>{props.sach.giaNiemYet}</del>
                        </span>
                        <span className="discounted-price col-6 text-end">
                            <strong>{props.sach.giaBan}đ</strong>
                        </span>
                    </div>
                    <div className="row mt-2" role="group">
                        <div className="col-6">
                            <a href="#" className="btn btn-secondary btn-block">
                                <i className="fas fa-heart"></i>
                            </a>
                        </div>
                        <div className="col-6">
                            <a href="#" className="btn btn-danger btn-block">
                                <i className="fas fa-shopping-cart"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SachProps;