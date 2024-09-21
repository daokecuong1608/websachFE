import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const Test = () => {
    const [usename, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        if (token) {
            const userData = jwtDecode(token)
            console.log(userData);
            if (userData) {
                setUsername(userData.sub + '')
            }
        }
    }, [])


    return (
        <div>
            {
                usename ? <h1>Chào mừng {usename} đến với trang web của chúng tôi</h1> : <h1>Chào mừng khách hàng đến với trang web của chúng tôi</h1>
            }
        </div>

    )
}
export default Test;