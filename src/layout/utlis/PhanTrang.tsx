import React from 'react';
import './PhanTrang.css';
interface PhanTrangInterface {
    trangHienTai: number;
    tongSoTrang: number;
    phanTrang: any
}
//phân trang hiển thị danh sách 
export const Phantrang: React.FC<PhanTrangInterface> = (props) => {

    const danhSachTrang = [];
    //set trang 
    if (props.trangHienTai === 1) {
        danhSachTrang.push(props.trangHienTai)
        if (props.tongSoTrang >= props.trangHienTai + 1) {
            danhSachTrang.push(props.trangHienTai + 1)
        }
        if (props.tongSoTrang >= props.trangHienTai + 2) {
            danhSachTrang.push(props.trangHienTai + 2)
        }
    } else if (props.trangHienTai > 1) {
        //trang -2
        if (props.trangHienTai >= 3) {
            danhSachTrang.push(props.trangHienTai - 2)
        }
        //trang -1
        if (props.trangHienTai >= 2) {
            danhSachTrang.push(props.trangHienTai - 1)
        }
        //ban than no 
        danhSachTrang.push(props.trangHienTai)
        //trang +1
        if (props.tongSoTrang >= props.trangHienTai + 1) {
            danhSachTrang.push(props.trangHienTai + 1)
        }
        //trang +2
        if (props.tongSoTrang >= props.trangHienTai + 2) {
            danhSachTrang.push(props.trangHienTai + 2)
        }
    }
    return (



        <div className="pagination-container">
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    <li className="page-item" onClick={() => props.phanTrang(1)}>
                        <button className="page-link">Trang đầu</button>
                    </li>
                    {
                        danhSachTrang.map((trang) => (
                            <li className="page-item" key={trang} onClick={() => props.phanTrang(trang)}>
                                <button className={`page-link ${props.trangHienTai === trang ? "active" : ""}`}>
                                    {trang}
                                </button>
                            </li>
                        ))
                    }
                    <li className="page-item" onClick={() => props.phanTrang(props.tongSoTrang)}>
                        <button className="page-link">Trang cuối</button>
                    </li>
                </ul>
            </nav>
        </div>

    )

}