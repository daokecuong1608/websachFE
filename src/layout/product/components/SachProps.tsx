import React, { useEffect, useState } from "react";
import SachModel from "../../../models/SachModel";
import HinhAnhModel from "../../../models/HinhAnhModels";
import { lay_1_AnhCuaMotSach, layToanBoAnhCuaMotSach } from "../../../api/HinhAnhApi";
import { Link } from "react-router-dom";
import renderRating from "../../utlis/RenderRating";
import DinhDangSo from "../../utlis/DinhDangSo";

interface SachPropsInterface {
    sach: SachModel;
}

const SachProps: React.FC<SachPropsInterface> = (props) => {

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

    let deLieuHinhAnh: string = "";
    if (danhSachHinhAnh[0] && danhSachHinhAnh[0].duLieuAnh) {
        deLieuHinhAnh = danhSachHinhAnh[0].duLieuAnh;
    }

    return (
        <div className="col-md-3 mt-2">
            <div className="card">
                <Link to={`/sach/${props.sach.maSach}`} >
                    <img
                        src={deLieuHinhAnh}
                        className="card-img-top"
                        alt={props.sach.tenSach}
                        style={{ height: "200px" }}
                    />
                </Link>
                <div className="card-body">
                    <Link to={`/sach/${props.sach.maSach}`} style={{ textDecoration: 'none' }} >
                        <h5 className="card-title">{props.sach.tenSach}</h5>
                    </Link>
                    {/* <p className="card-text">{props.sach.moTa}</p> */}
                    <div className="price row">
                        <span className="original-price col-6 text-end">
                            <del>{DinhDangSo(props.sach.giaNiemYet ? props.sach.giaNiemYet : 0)}</del>
                        </span>
                        <span className="discounted-price col-6 ">
                            <strong>{DinhDangSo(props.sach.giaBan ? props.sach.giaBan : 0)}</strong>
                        </span>
                    </div>
                    <div className="row mt-2" role="group">
                        <div className="col-6">
                            {renderRating(props.sach.trungBinhXepHang ? props.sach.trungBinhXepHang : 0)}
                        </div>
                        <div className="col-6 text-end ">
                            <a href="#" className="btn btn-secondary btn-block">
                                <i className="fas fa-heart"></i>
                            </a>
                            <button className="btn btn-danger btn-block">
                                <i className="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SachProps;