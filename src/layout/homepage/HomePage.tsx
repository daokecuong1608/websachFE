import { useParams } from "react-router-dom";
import DanhSachSanPham from "../product/DanhSachSanPham";
import Banner from "./compoments/Banner";
import Carousel from "./compoments/Carousel";

interface HomePageProps {
    tuKhoaTimKiem: string
}

function HomePage({ tuKhoaTimKiem }: HomePageProps) {

    const { maTheLoai } = useParams();
    let maTheLoaiNumber = 0;
    try {
        //NaN
        maTheLoaiNumber = parseInt(maTheLoai + "")
    } catch (error) {
        maTheLoaiNumber = 0;
    }
    if (Number.isNaN(maTheLoaiNumber)) {
        maTheLoaiNumber = 0;
    }

    return (
        <div>
            <Banner />
            <Carousel />
            <DanhSachSanPham
                tuKhoaTimKiem={tuKhoaTimKiem}
                maTheLoai={maTheLoaiNumber}
            />
        </div>
    )
}
export default HomePage;