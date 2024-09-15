import React from "react";
import SachModel from "../models/SachModel";
import my_request from "./Request";



export async function layToanBoSach(): Promise<SachModel[]> {
    const ketQua: SachModel[] = [];

    //xac dinh endpoint
    const duongDan: string = 'http://localhost:8080/sach';

    //goi ham request
    const reponse = await my_request(duongDan);

    //lay ra json sach 
    const responseData = reponse._embedded.saches;

    for (const key in responseData) {
        {
            ketQua.push({
                maSach: responseData[key].maSach,
                tenSach: responseData[key].tenSach,
                giaBan: responseData[key].giaBan,
                giaNiemYet: responseData[key].giaNiemYet,
                moTa: responseData[key].moTa,
                soLuong: responseData[key].soLuong,
                tenTacGia: responseData[key].tenTacGia,
                trungBinhXepHang: responseData[key].trungBinhXepHang
            });
        }
    }

    return ketQua;
}