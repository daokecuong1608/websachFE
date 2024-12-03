import React, { FormEvent, useState } from 'react';
import RequireAdmin from './RequireAdmin';
import useAuth from '../../utils/useAuth';


const SachForm: React.FC = (props) => {
    useAuth();
    const [sach, setSach] = useState({
        maSach: '0',
        tenSach: '',
        IBNS: '',
        giaBan: 0,
        giaNiemYet: 0,
        moTa: '',
        soLuong: 0,
        tenTacGia: '',
        trungBinhXepHang: 0,
    });

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token');;
        fetch(
            ' http://localhost:8080/sach',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(sach)
            }
        ).then((reponse) => {
            console.log("aaa" + reponse);
            if (reponse.ok) {
                alert('Thêm sách thành công');
                setSach({
                    maSach: '0',
                    tenSach: '',
                    IBNS: '',
                    giaBan: 0,
                    giaNiemYet: 0,
                    moTa: '',
                    soLuong: 0,
                    tenTacGia: '',
                    trungBinhXepHang: 0,
                })
            } else {
                alert('Thêm sách thất bại');
            }
        }

        )

    }

    return (
        <div className='container row đ-flex align-items-center  justify-content-center'>
            <div className='col-6'>
                <h1>THÊM SÁCH</h1>
                <form onSubmit={handleSubmit}>
                    <input type="hidden"
                        name="maSach"
                        id="maSach"
                        value={sach.maSach} />

                    <label htmlFor='tenSach'>Tên sách</label>
                    <input
                        className='form-control'
                        type="text"
                        name="tenSach"
                        id="tenSach"
                        value={sach.tenSach}
                        required
                        onChange={(e) => setSach({ ...sach, tenSach: e.target.value })} />

                    <label htmlFor='giaBan'>Giá bán</label>
                    <input
                        className='form-control'
                        type="number"
                        name="giaBan"
                        id="giaBan"
                        value={sach.giaBan}
                        required
                        onChange={(e) => setSach({ ...sach, giaBan: +e.target.value })} />

                    <label htmlFor='giaNiemYet'>Giá niêm yết</label>
                    <input className='form-control'
                        type="number"
                        name="giaNiemYet"
                        id="giaNiemYet"
                        value={sach.giaNiemYet}
                        required
                        onChange={(e) => setSach({ ...sach, giaNiemYet: +e.target.value })} />

                    <label htmlFor='moTa'> Mô tả</label>
                    <textarea
                        className='form-control'
                        name="moTa"
                        id="moTa"
                        value={sach.moTa}
                        required
                        onChange={(e) => setSach({ ...sach, moTa: e.target.value })} />

                    <label htmlFor='soLuong'>Số lượng</label>
                    <input
                        className='form-control'
                        type="number"
                        name="soLuong"
                        id="soLuong"
                        value={sach.soLuong}
                        required
                        onChange={(e) => setSach({ ...sach, soLuong: +e.target.value })} />

                    <label htmlFor='tenTacGia'>Tên tác giả</label>
                    <input
                        className='form-control'
                        type="text"
                        name="tenTacGia"
                        id="tenTacGia"
                        value={sach.tenTacGia}
                        required
                        onChange={(e) => setSach({ ...sach, tenTacGia: e.target.value })} />

                    <label htmlFor='trungBinhXepHang'>Trung bình xếp hạng</label>
                    <input
                        className='form-control'
                        type="number"
                        name="trungBinhXepHang"
                        id="trungBinhXepHang"
                        value={sach.trungBinhXepHang}
                        required
                        onChange={(e) => setSach({ ...sach, trungBinhXepHang: +e.target.value })} />

                    <label htmlFor='IBNS'>IBNS</label>
                    <input
                        className='form-control'
                        type="text"
                        name="IBNS"
                        id="IBNS"
                        value={sach.IBNS}
                        required
                        onChange={(e) => setSach({ ...sach, IBNS: e.target.value })} />

                    <button type='submit' className='btn btn-primary mt-2'>Thêm sách</button>
                </form>
            </div>
        </div>
    )
}
const SachForm_Admin = RequireAdmin(SachForm);
export default SachForm_Admin; 