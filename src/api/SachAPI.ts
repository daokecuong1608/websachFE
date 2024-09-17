import React from "react";
import SachModel from "../models/SachModel";
import my_request from "./Request";

interface KetQuaInterface {
    ketQua: SachModel[];
    tongSoTrang: number;
    tongSoSach: number;
}

async function laySach(duongDan: string): Promise<KetQuaInterface> {
    //lấy dữ liệu từ server
    const ketQua: SachModel[] = [];
    //Gọi phuonmg thức request để lấy dữ liệu
    const response = await my_request(duongDan);
    //lay ra json tù sach dữ liệu
    const reponseData = response._embedded.saches;
    console.log(response);


    //lấy thong tin trang 
    const tongSoTrang: number = response.page.totalPages;
    const tongSoSach: number = response.page.totalElements;

    for (const key in reponseData) {
        ketQua.push({
            maSach: reponseData[key].maSach,
            tenSach: reponseData[key].tenSach,//co the la undefined
            giaBan: reponseData[key].giaBan,
            giaNiemYet: reponseData[key].giaNiemYet,
            moTa: reponseData[key].moTa,
            soLuong: reponseData[key].soLuong,
            tenTacGia: reponseData[key].tenTacGia,
            trungBinhXepHang: reponseData[key].trungBinhXepHang

            //đưa sách vào mảng
            // ketQua.push(sachModel);
        });

        // const sach = reponseData[key];
        // //tạo một đối tượng sách
        // const sachModel = new SachModel(
        //     sach.maSach,
        //     sach.tenSach,
        //     sach.giaBan,
        //     sach.giaNiemYet,
        //     sach.moTa,
        //     sach.soLuong,
        //     sach.tenTacGia,
        //     sach.trungBinhXepHang
        // );
        // //      đưa sách vào mảng
        // ketQua.push(sachModel);

    }

    console.log(ketQua);
    return { ketQua: ketQua, tongSoSach: tongSoSach, tongSoTrang: tongSoTrang };
}

export async function layToanBoSach(trang: number): Promise<KetQuaInterface> {
    //xấc định endpoint
    const duongDan: string = `http://localhost:8080/sach?sort=maSach,desc&size=8&page=${trang}`;
    return laySach(duongDan);
}

export async function lay_3_Sach(): Promise<KetQuaInterface> {
    //xấc định endpoint
    const duongDan: string = 'http://localhost:8080/sach?sort=maSach,desc&page=0&size=3';
    return laySach(duongDan);
}


export async function timKiemSach(tuKhoaTimKiem: string, maTheLoai: number): Promise<KetQuaInterface> {
    //xấc định endpoint
    let duongDan: string = `http://localhost:8080/sach?sort=maSach,desc&size=8&page=0`;
    if (tuKhoaTimKiem !== '' && maTheLoai === 0) {
        //tìm kiếm theo tên sách
        duongDan = `http://localhost:8080/sach/search/findByTenSachContaining?tenSach=${tuKhoaTimKiem}&page=0&size=8&sort=maSach,desc`;
    } else if (tuKhoaTimKiem === '' && maTheLoai > 0) {
        duongDan = `http://localhost:8080/sach/search/findByDanhSachTheLoai_MaTheLoai?maTheLoai=${maTheLoai}`;
    } else if (tuKhoaTimKiem !== '' && maTheLoai > 0) {
        duongDan = `http://localhost:8080/sach/search/findByTenSachContainingAndDanhSachTheLoai_MaTheLoai?tenSach=${tuKhoaTimKiem}&maTheLoai=${maTheLoai}&page=0&size=8&sort=maSach,desc`;
    }
    return laySach(duongDan);
}