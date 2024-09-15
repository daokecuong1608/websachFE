import React from "react";
import HinhAnhModel from "../models/HinhAnhModels";
import my_request from "./Request";


async function layAnhCua_1_Sach(duongDan: string): Promise<HinhAnhModel[]> {

    const ketQua: HinhAnhModel[] = [];

    //goi ham request
    const reponse = await my_request(duongDan);

    //lay ra json sach 
    const responseData = reponse._embedded.hinhAnhs;

    for (const key in responseData) {
        {
            ketQua.push({
                maHinhAnh: responseData[key].maHinhAnh,
                tenHinhAnh: responseData[key].tenHinhAnh,
                laIcon: responseData[key].laIcon,
                duongDan: responseData[key].duongDan,
                duLieuAnh: responseData[key].duLieuAnh,
            });
        }
    }

    return ketQua;
}


export async function layToanBoAnhCuaMotSach(maSach: number): Promise<HinhAnhModel[]> {
    //xac dinh endpoint
    const duongDan: string = `http://localhost:8080/sach/${maSach}/danhSachHinhAnh`;
    return layAnhCua_1_Sach(duongDan);
}

export async function lay_1_AnhCuaMotSach(maSach: number): Promise<HinhAnhModel[]> {
    //xac dinh endpoint
    const duongDan: string = `http://localhost:8080/sach/${maSach}/danhSachHinhAnh?sort=maHinhAnh,asc&page=0&size=1`;
    return layAnhCua_1_Sach(duongDan);
}