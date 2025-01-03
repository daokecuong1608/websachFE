import { useEffect, useState } from "react";
import request from "../../utils/request";
import "./css/Products.css";
import RequireAdmin from "./RequireAdmin";

interface ProductsProps {
    maSach: number;
    tenSach: string;
    tenTacGia: string;
    ISBN: string;
    moTa: string;
    giaNiemYet: number;
    giaBan: number;
    soLuong: number;
    trungBinhXepHang: number;
    danhSachHinhAnh: string[];
}

const Products: React.FC = () => {
    const [products, setProducts] = useState<ProductsProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await request.get("/api/sach", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            setProducts(response.data);
            setError(null);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu sách:", error);
            setError("Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (maSach: number) => {
        window.location.href = `/admin/update-product/${maSach}`;
    };

    const handleDelete = async (maSach: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
            setLoading(true);
            try {
                await request.delete(`/api/sach/${maSach}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });
                fetchProducts();
            } catch (error) {
                console.error("Lỗi khi xóa sản phẩm:", error);
                setError("Không thể xóa sản phẩm. Vui lòng thử lại sau.");
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="products-container">
            <h2 className="products-title">Danh sách sản phẩm</h2>
            <table className="products-table">
                <thead>
                    <tr>
                        <th>Mã sách</th>
                        <th>Tên sách</th>
                        <th>Tác giả</th>
                        <th>Giá bán</th>
                        <th>Số lượng</th>
                        <th>Xếp hạng</th>
                        <th>Hình ảnh</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.maSach}>
                            <td>{product.maSach}</td>
                            <td>{product.tenSach}</td>
                            <td>{product.tenTacGia}</td>
                            <td>{product.giaBan.toLocaleString()} VND</td>
                            <td>{product.soLuong}</td>
                            <td>{product.trungBinhXepHang}</td>
                            <td>
                                {product.danhSachHinhAnh.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Hình ảnh của ${product.tenSach}`}
                                        className="product-image"
                                    />
                                ))}
                            </td>
                            <td>
                                <button
                                    className="products-action-btn update-btn"
                                    onClick={() => handleUpdate(product.maSach)}
                                >
                                    Update
                                </button>
                                <button
                                    className="products-action-btn delete-btn"
                                    onClick={() => handleDelete(product.maSach)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const Products_Admin = RequireAdmin(Products)
export default Products_Admin;