async function my_request(duongDan: string) {
    //truy vấn đến đường dẫn
    const response = await fetch(duongDan);
    //nếu không kết nối được đến server thì báo lỗi
    if (!response.ok) {
        throw new Error(`Lỗi kết nối đến server ${duongDan}`);
    }
    //trả về dữ liệu dạng json
    return response.json();
}
export default my_request;