import { useEffect, useState } from "react";
import request from "../../utils/request";
import RequireAdmin from "./RequireAdmin";

const ThemHinhAnh: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [maSach, setMaSach] = useState<number | null>(null);
    const [tenHinhAnh, setTenHinhAnh] = useState<string>('');
    const [laIcon, setLaIcon] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [sachList, setSachList] = useState<any[]>([]); // Dữ liệu các sách
    const [loadingSach, setLoadingSach] = useState<boolean>(false); // Trạng thái tải danh sách sách

    useEffect(() => {
        fetchSachList();
    }, []);

    const fetchSachList = async () => {
        setLoadingSach(true);
        try {
            const response = await request.get('/sach');
            // Kiểm tra dữ liệu trả về có chứa _embedded và saches
            if (response.data && response.data._embedded && Array.isArray(response.data._embedded.saches)) {
                setSachList(response.data._embedded.saches); // Lưu mảng sách vào state
            } else {
                setMessage('Dữ liệu sách không hợp lệ.');
            }
            console.log(response.data); // Log dữ liệu để kiểm tra
        } catch (error) {
            setMessage('Lỗi khi tải danh sách sách.');
            console.error("Error fetching sach list:", error); // Log the error in case of failure            }
        } finally {
            setLoadingSach(false);
        }
    }

    // Xử lý sự kiện thay đổi file
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };


    const hanleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
            setMessage('Chưa chọn hình ảnh');
            return;
        }
        if (!maSach) {
            setMessage('Chưa chọn sách');
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('maSach', String(maSach));
        formData.append('tenHinhAnh', tenHinhAnh);
        formData.append('laIcon', String(laIcon));
        try {
            const response = await request.post('/api/hinh-anh/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            setMessage(response.data);
            // Làm mới dữ liệu
            setFile(null);
            setMaSach(null);
            setTenHinhAnh('');
            setLaIcon(false);
            fetchSachList();
        } catch (error) {
            setMessage("Lỗi khi upload ảnh.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h2>Thêm hình ảnh</h2>
            <form onSubmit={hanleSubmit}>

                <div>
                    <label htmlFor="file"> Chọn hình ảnh </label>
                    <input
                        type="file"
                        id="file"
                        onChange={handleFileChange}
                    />
                </div>

                <div>

                    <label htmlFor="maSach"> Chọn sách </label>
                    {loadingSach ? (
                        <p>Đang tải sách </p>
                    ) : (
                        <select
                            id="maSach"
                            value={maSach ?? ''}
                            onChange={(e) => setMaSach(Number(e.target.value))}
                        >
                            <option value=""> Chọn mã sách:</option>
                            {sachList.map((sach) => (
                                <option
                                    key={sach.maSach}
                                    value={sach.maSach}
                                >
                                    {sach.tenSach} (Mã : {sach.maSach})</option>
                            ))}

                        </select>
                    )}
                </div>

                <div >
                    <label htmlFor="tenHinhAnh">Tên hình ảnh</label>
                    <input
                        type="text"
                        id="tenHinhAnh"
                        placeholder="Tên hình ảnh (tùy chọn)"
                        value={tenHinhAnh}
                        onChange={(e) => setTenHinhAnh(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="laIcon">Đặt làm icon:</label>
                    <input
                        type="checkbox"
                        id="laIcon"
                        checked={laIcon}
                        onChange={(e) => setLaIcon(e.target.checked)}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Đang tải...' : 'Thêm hình ảnh'}
                </button>
            </form>
            {message && <p>{message}</p>}

        </div>
    )

}

const ThemHinhAnh_Admin = RequireAdmin(ThemHinhAnh);
export default ThemHinhAnh_Admin;