import { useEffect, useState } from "react";
import request from "../../utils/request";
import "./css/Categories.css";

interface Category {
    maTheLoai: number;
    tenTheLoai: string;
}

const Categories: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await request.get('/api/the-loai');
            setCategories(response.data);
            setError(null);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu thể loại:', error);
            setError('Không thể tải danh sách thể loại. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = (maTheLoai: number) => {
        window.location.href = `/admin/update-category/${maTheLoai}`;
    };


    const handleDelete = async (maTheLoai: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa thể loại này?")) {
            setLoading(true);
            try {
                await request.delete(`/api/the-loai/${maTheLoai}`);
                // Sau khi xóa thành công, tải lại danh sách thể loại
                fetchCategories();
            } catch (error) {
                console.error('Lỗi khi xóa thể loại:', error);
                setError('Không thể xóa thể loại. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="categories-container">
            <h1>Quản lý Thể Loại</h1>
            {loading && <p>Đang tải dữ liệu...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && (
                <table className="categories-table">
                    <thead>
                        <tr>
                            <th>Mã Thể Loại</th>
                            <th>Tên Thể Loại</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.maTheLoai}>
                                <td>{category.maTheLoai}</td>
                                <td>{category.tenTheLoai}</td>
                                <td>
                                    <button
                                        className="update-btn"
                                        onClick={() => handleUpdate(category.maTheLoai)}
                                    >
                                        Cập nhật
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(category.maTheLoai)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Categories;
