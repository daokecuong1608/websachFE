import { useEffect, useState } from "react";
import request from "../../utils/request";
import "./css/DeliveryMethods.css";

interface DeliveryMethodsProps {
    maHinhThucGiaoHang: number;
    tenHinhThucGiaoHang: string;
    chiPhiGiaoHang: number;
}

const DeliveryMethods: React.FC = () => {
    const [deliveryMethods, setDeliveryMethods] = useState<DeliveryMethodsProps[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchDeliveryMethods();
    }, []);

    const fetchDeliveryMethods = async () => {
        setLoading(true);
        try {
            const response = await request.get('/api/hinh-thuc-giao-hang');
            setDeliveryMethods(response.data);
            setError(null);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu hình thức giao hàng:', error);
            setError('Không thể tải danh sách hình thức giao hàng. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (maHinhThucGiaoHang: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa hình thức giao hàng này?")) {
            setLoading(true);
            try {
                await request.delete(`/api/hinh-thuc-giao-hang/${maHinhThucGiaoHang}`);
                fetchDeliveryMethods();
            } catch (error) {
                console.error('Lỗi khi xóa hình thức giao hàng:', error);
                setError('Không thể xóa thể loại. Vui lòng thử lại sau.');

            } finally {
                setLoading(false);
            }
        }
    }


    const handleUpdate = async (maHinhThucGiaoHang: number) => {
        window.location.href = `/admin/update-delivery/${maHinhThucGiaoHang}`;
    }

    const formatCurrency = (value: number | undefined) => {
        return value ? value.toLocaleString('vi-VN') : '0';
    };

    return (
        <div className="delivery-container">
            <h1>Quản lý Hình Thức Giao Hàng</h1>
            {loading && <p>Đang tải dữ liệu...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && (
                <table className="delivery-table">
                    <thead>
                        <tr>
                            <th>Mã Hình Thức Giao Hàng</th>
                            <th>Tên Hình Thức Giao Hàng</th>
                            <th>Phí Giao Hàng</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deliveryMethods.map((deliveryMethod) => (
                            <tr key={deliveryMethod.maHinhThucGiaoHang}>
                                <td>{deliveryMethod.maHinhThucGiaoHang}</td>
                                <td>{deliveryMethod.tenHinhThucGiaoHang}</td>
                                <td>{formatCurrency(deliveryMethod.chiPhiGiaoHang)} VND</td>
                                <td>
                                    <a className="update-btn" onClick={() => handleUpdate(deliveryMethod.maHinhThucGiaoHang)}>Update</a>
                                    <a className="delete-btn" onClick={() => handleDelete(deliveryMethod.maHinhThucGiaoHang)}>Delete</a>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DeliveryMethods;
