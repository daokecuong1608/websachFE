import React, { useEffect, useState } from "react";
import SachModel from "../../../models/SachModel";
import { lay_3_Sach } from "../../../api/SachAPI";
import CarouselItem from "./CarouselItem";

const Carousel: React.FC = () => {

    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);

    //chỉ gọi 1 lần duy nhất khi component được render
    useEffect(() => {
        lay_3_Sach().then(
            sachData => {
                setDanhSachQuyenSach(sachData);
                setDangTaiDuLieu(false);
            }
        ).catch(
            error => {
                setDangTaiDuLieu(false);
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
        <div>
            <div id="carouselExampleDark" className="carousel carousel-dark slide">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">

                        <CarouselItem
                            key={0}
                            sach={danhSachQuyenSach[0]}
                        />

                    </div>

                    <div className="carousel-item" data-bs-interval="10000">
                        <CarouselItem
                            key={1}
                            sach={danhSachQuyenSach[1]}
                        />
                    </div>

                    <div className="carousel-item" data-bs-interval="10000">
                        <CarouselItem
                            key={2}
                            sach={danhSachQuyenSach[2]}
                        />
                    </div>


                </div>


                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev" >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
export default Carousel;