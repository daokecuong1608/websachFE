import React from "react";
import HinhAnhModel from "../models/HinhAnhModels";
import my_request from "./Request";

export async function layToanBoAnhCuaMotSach(maSach: number): Promise<HinhAnhModel[]> {
    const ketQua: HinhAnhModel[] = [];

    //xac dinh endpoint
    const duongDan: string = `http://localhost:8080/sach/${maSach}/danhSachHinhAnh`;

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