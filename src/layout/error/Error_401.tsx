import { useNavigate } from "react-router-dom";

const Error_401 = () => {

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className="error-page">
            <h1>401 - Authorization requiredred</h1>
            <p>Sorry, you don't have permission to access this page.</p>
            <button onClick={handleGoBack}>Go to Home</button>
        </div>
    );
}
export default Error_401;