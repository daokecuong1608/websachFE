import { useNavigate, useParams } from 'react-router-dom';
import './css/UpdateCategory.css';
import { useEffect, useState } from 'react';
import request from '../../utils/request';

const UpdateCategory: React.FC = () => {
    const { maTheLoai } = useParams<{ maTheLoai: string }>(); // Lấy maTheLoai từ URL params
    const [tenTheLoai, setTenTheLoai] = useState<string>(''); // Lưu tên thể loại
    const [loading, setLoading] = useState<boolean>(false); // Trạng thái tải dữ liệu
    const [error, setError] = useState<string | null>(null); // Lỗi khi tải dữ liệu
    const navigate = useNavigate(); // Dùng để điều hướng sau khi cập nhật

    // Khi component load xong, gọi API lấy thông tin thể loại
    useEffect(() => {
        fetchCategory();
    }, [maTheLoai]);

    // Hàm lấy thông tin thể loại
    const fetchCategory = async () => {
        setLoading(true);
        try {
            const response = await request.get(`/api/the-loai/${maTheLoai}`);
            setTenTheLoai(response.data.tenTheLoai); // Gán tên thể loại vào state
            setError(null); // Reset lỗi
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu thể loại:', error);
            setError('Không thể tải thông tin thể loại. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    // Hàm xử lý cập nhật thể loại
    const handleUpdate = async () => {
        if (!tenTheLoai.trim()) {
            alert('Tên thể loại không được để trống.');
            return;
        }

        setLoading(true); // Bật trạng thái tải
        try {
            const categoryData = { tenTheLoai }; // Gửi tên thể loại vào trong body
            await request.put(`/api/the-loai/${maTheLoai}`, categoryData); // Gửi PUT request với dữ liệu
            alert('Cập nhật thành công!');
            navigate('/admin/categories'); // Điều hướng về trang danh sách thể loại
        } catch (error) {
            console.error('Lỗi khi cập nhật thể loại:', error);
            setError('Không thể cập nhật thể loại. Vui lòng thử lại sau.');
        } finally {
            setLoading(false); // Dừng trạng thái tải
        }
    };

    return (
        <div className="update-category-container">
            <h1>Cập nhật thể loại</h1>
            {loading && <p>Đang tải dữ liệu...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault(); // Ngăn không cho form reload trang
                        handleUpdate(); // Gọi hàm cập nhật
                    }}
                >
                    <div className="form-group">
                        <label htmlFor="tenTheLoai">Tên Thể Loại:</label>
                        <input
                            type="text"
                            id="tenTheLoai"
                            value={tenTheLoai}
                            onChange={(e) => setTenTheLoai(e.target.value)} // Cập nhật giá trị khi thay đổi
                        />
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="update-btn">
                            Cập nhật
                        </button>
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate('/admin/categories')} // Hủy và quay lại danh sách
                        >
                            Hủy
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default UpdateCategory;
