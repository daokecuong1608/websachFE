import React from 'react';
import { useNavigate } from 'react-router-dom';

import './css/Error_403.css';
const Error403: React.FC = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className="error-page">
            <h1>403 - Forbidden</h1>
            <p>Sorry, you don't have permission to access this page.</p>
            <button onClick={handleGoBack}>Go to Home</button>
        </div>
    );
};

export default Error403;