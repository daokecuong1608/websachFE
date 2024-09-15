import React from "react";
import SachModel from "../models/SachModel";
import my_request from "./Request";


async function laySach(duongDan: string): Promise<SachModel[]> {
    const ketQua: SachModel[] = [];



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


export async function layToanBoSach(): Promise<SachModel[]> {
    //xac dinh endpoint
    const duongDan: string = 'http://localhost:8080/sach?sort=maSach,desc';
    return laySach(duongDan);
}

export async function lay_3_Sach(): Promise<SachModel[]> {
    //xac dinh endpoint
    const duongDan: string = 'http://localhost:8080/sach?sort=maSach,desc&page=0&size=3';
    return laySach(duongDan);
}