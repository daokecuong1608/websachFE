import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import request from "../../utils/request";
import RequireAdmin from "./RequireAdmin";
import "./css/UpdateProduct.css";

interface ProductProps {
    maSach: number;
    tenSach: string;
    tenTacGia: string;
    isbn: string;
    moTa: string;
    giaNiemYet: number;
    giaBan: number;
    soLuong: number;
    trungBinhXepHang: number;
    danhSachHinhAnh: string[];
}

const UpdateProduct: React.FC = () => {
    const { maSach } = useParams<{ maSach: string }>();
    const navigate = useNavigate();

    const [product, setProduct] = useState<ProductProps | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProduct(Number(maSach));
    }, [maSach]);

    const fetchProduct = async (maSach: number) => {
        setLoading(true);
        try {
            const response = await request.get(`/api/sach/${maSach}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setProduct(response.data);
            setError(null);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu sách:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setProduct((prevProduct) => (prevProduct ? { ...prevProduct, [name]: value } : null));
    };

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p>{error}</p>;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!product) return;
        setLoading(true);
        try {
            await request.put(`/api/sach/${maSach}`, product, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            alert("Cập nhật thành công!");
            navigate("/admin/products");
        } catch (error) {
            console.error("Lỗi khi cập nhật sản phẩm:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="update-product-container">
            <h2 className="update-product-title">Cập nhật sản phẩm</h2>
            {product && (
                <form onSubmit={handleSubmit} className="update-product-form">
                    <div className="update-product-columns">
                        <div className="update-product-column">
                            <h3 className="update-product-section-title">Thông tin cơ bản</h3>
                            <div className="update-product-group">
                                <label htmlFor="update-tenSach">Tên sách:</label>
                                <input
                                    type="text"
                                    id="update-tenSach"
                                    name="tenSach"
                                    value={product.tenSach}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="update-product-group">
                                <label htmlFor="update-tenTacGia">Tác giả:</label>
                                <input
                                    type="text"
                                    id="update-tenTacGia"
                                    name="tenTacGia"
                                    value={product.tenTacGia}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="update-product-group">
                                <label htmlFor="update-isbn">ISBN:</label>
                                <input
                                    type="text"
                                    id="update-isbn"
                                    name="isbn"
                                    value={product.isbn}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="update-product-column">
                            <h3 className="update-product-section-title">Chi tiết sản phẩm</h3>
                            <div className="update-product-group">
                                <label htmlFor="update-giaNiemYet">Giá bán niêm yết:</label>
                                <input
                                    type="number"
                                    id="update-giaNiemYet"
                                    name="giaNiemYet"
                                    value={product.giaNiemYet}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="update-product-group">
                                <label htmlFor="update-giaBan">Giá bán:</label>
                                <input
                                    type="number"
                                    id="update-giaBan"
                                    name="giaBan"
                                    value={product.giaBan}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="update-product-group">
                                <label htmlFor="update-soLuong">Số lượng:</label>
                                <input
                                    type="number"
                                    id="update-soLuong"
                                    name="soLuong"
                                    value={product.soLuong}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="update-product-group">
                                <label htmlFor="update-moTa">Mô tả:</label>
                                <textarea
                                    id="update-moTa"
                                    name="moTa"
                                    value={product.moTa}
                                    onChange={handleInputChange}
                                    rows={4}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="update-product-btn">
                        Cập nhật
                    </button>
                </form>
            )}
        </div>
    );
};

const UpdateProduct_Admin = RequireAdmin(UpdateProduct);
export default UpdateProduct_Admin;
