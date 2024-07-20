// GoogleButton.js
import React from 'react';
import './GoogleButton.css';

const GoogleButton = () => {
    const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

    const handleGoogleSignIn = () => {
        window.location.href = `${API_URL}/auth/google`;
    };

    return (
        <div className="google-btn-container">
            <button className="google-btn" onClick={handleGoogleSignIn}>
                <img src="/images/google-icon.png" alt="Google logo" className="google-icon" />
                Continuar con Google
            </button>
        </div>
    );
};

export default GoogleButton;
