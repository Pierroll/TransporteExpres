import React from 'react';
import './GoogleButton.css';

const GoogleButton = () => {
    const handleGoogleSignIn = () => {
        window.location.href = 'http://localhost:5000/auth/google';
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
