import axio from "./axiosConfig";

export interface AddToCartRequest {
    maSach: number;
    soLuong: number;
}
export const addToCart = async (request: AddToCartRequest): Promise<string> => {
    try {
        const response = await axio.post("api/cart/add", request,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
        // Trả về thông báo thành công
        return response.data.message || "Thêm vào giỏ hàng thành công!";
    } catch (error: any) {
        // Xử lý lỗi từ server
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || "Không thể thêm vào giỏ hàng.");
        }
        // Lỗi khác (kết nối, etc.)
        throw new Error("Lỗi kết nối. Vui lòng thử lại.");
    }
}