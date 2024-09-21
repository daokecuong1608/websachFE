import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const KichHoatTaiKhoan = () => {
    // const [email, setEmail] = useState('');
    // const [maKichHoat, setMaKichHoat] = useState('');
    const { email } = useParams();
    const { maKichHoat } = useParams();
    const [daKichHoat, setDaKichHoat] = useState(false);
    const [thongBao, setThongBao] = useState('');

    useEffect(() => {

        // //lấy ra biến theo 1 các chủ động 
        // const searchParams = new URLSearchParams(window.location.search);
        // const emailParams = searchParams.get("email");
        // const maKichHoatParams = searchParams.get("maKichHoat");
        // console.log(emailParams)
        // console.log(maKichHoatParams)

        console.log("email" + email)
        console.log("makichhoat" + maKichHoat)

        if (email && maKichHoat) {
            // setEmail(emailParams);
            // setMaKichHoat(maKichHoatParams);
            handleKichHoatTaiKhoan();
        }
    }, [])

    const handleKichHoatTaiKhoan = async () => {
        console.log("email: " + email + " maKichHoat: " + maKichHoat);
        try {
            const url: string = `http://localhost:8080/tai-khoan/kich-hoat?email=${email}&maKichHoat=${maKichHoat}`;
            const response = await fetch(url, { method: 'GET' });
            if (response.ok) {
                setDaKichHoat(true);
            } else {
                setThongBao(response.text + "");
            }
        } catch (error) {
            console.log("Lỗi :" + error);
        }
    }

    return (
        <div>
            <h1>Kích hoạt tài khoản </h1>
            {
                daKichHoat
                    ?
                    (<p>Tài khoản đã được kích hoạt thành công đăng nhập để tiếp sử dụng </p>)
                    :
                    (<p>{thongBao}</p>)
            }
        </div>
    )
}
export default KichHoatTaiKhoan;