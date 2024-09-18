function DinhDangSo(x: number) {
    if (isNaN(x)) {
        return 0;
    }
    //Sử dụng hàm toLocaleString để định dạng số
    return x.toLocaleString('vi', { style: 'currency', currency: 'VND' });

}
export default DinhDangSo