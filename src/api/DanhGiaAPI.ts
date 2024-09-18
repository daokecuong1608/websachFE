import React from "react";
import my_request from "./Request";
import DanhGiaModel from "../models/DanhGiaModel";

async function layDanhGiaCua_1_Sach(duongDan: string): Promise<DanhGiaModel[]> {

    const ketQua: DanhGiaModel[] = [];

    //goi ham request
    const reponse = await my_request(duongDan);

    //lay ra json sach 
    const responseData = reponse._embedded.suDanhGias;

    for (const key in responseData) {

        ketQua.push({
            maDanhGia: responseData[key].maDanhGia,
            diemXepHang: responseData[key].diemXepHang,
            nhanXet: responseData[key].nhanXet,

        });

    }
    console.log("số lượng : " + ketQua.length);
    return ketQua;

}

export async function layToanBoDanhGiaCuaMotSach(maSach: number): Promise<DanhGiaModel[]> {
    //xac dinh    
    const duongDan: string = `http://localhost:8080/sach/${maSach}/danhSachSuDanhGia`;
    console.log(duongDan);
    return layDanhGiaCua_1_Sach(duongDan);
}
