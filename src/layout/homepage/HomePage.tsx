import DanhSachSanPham from "../product/DanhSachSanPham";
import Banner from "./compoments/Banner";
import Carousel from "./compoments/Carousel";

function HomePage() {
    return (
        <div>
            <Banner />
            <Carousel />
            <DanhSachSanPham />
        </div>
    )
}
export default HomePage;