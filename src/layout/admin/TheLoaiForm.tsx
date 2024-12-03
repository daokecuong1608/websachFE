import { FormEvent, useState } from "react";
import RequireAdmin from "./RequireAdmin";
import "./css/TheLoaiForm.css";
import useAuth from "../../utils/useAuth";

const TheLoaiForm: React.FC = (props) => {
    useAuth();
    const [theLoai, setTheLoai] = useState({
        maTheLoai: '0',
        tenTheLoai: ''
    });

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        fetch(
            'http://localhost:8080/the-loai',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(theLoai)
            }
        ).then((response) => {
            console.log("aaa" + response);
            if (response.ok) {
                alert('Thêm thể loại thành công');

                setTheLoai({
                    maTheLoai: '0',
                    tenTheLoai: ''
                });
            } else {
                alert('Thêm thể loại thất bại');
            }
        });
    };

    return (
        <div className="form-container-tl">
            <form onSubmit={handleSubmit}>
                <div className="form-group-tl">
                    <input
                        type="hidden"
                        placeholder="Mã thể loại"
                        value={theLoai.maTheLoai}
                    />
                </div>
                <div className="form-group-tl">
                    <label htmlFor="tenTheLoai">Tên thể loại:</label>
                    <input
                        type="text"
                        placeholder="Tên thể loại"
                        name="tenTheLoai"
                        id="tenTheLoai"
                        value={theLoai.tenTheLoai}
                        onChange={(e) => setTheLoai({ ...theLoai, tenTheLoai: e.target.value })}
                    />
                </div>
                <div className="form-group-tl">
                    <button type="submit" className="submit-button-tl">Thêm thể loại</button>
                </div>
            </form>
        </div>
    );
};

const TheLoai_Admin = RequireAdmin(TheLoaiForm);
export default TheLoai_Admin;