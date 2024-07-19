import React, { useEffect, useState } from 'react';
import GoogleButton from './GoogleButton'; // eslint-disable-line no-unused-vars
import PromotionModal from './PromotionModal';
import './Signup.css';

const Signup = () => {
    const [promotionCode, setPromotionCode] = useState(null);
    const [isNewUser, setIsNewUser] = useState(false);

    useEffect(() => {
        // Verificar si hay parámetros en la URL indicando un nuevo registro
        const queryParams = new URLSearchParams(window.location.search);
        const promoCode = queryParams.get('promoCode');
        const isNew = queryParams.get('isNew') === 'true';

        // Solo mostrar el modal si hay un nuevo usuario y un código de promoción
        if (isNew && promoCode) {
            setPromotionCode(promoCode);
            setIsNewUser(true);
        }
    }, []);

    const handleGoogleSignUp = () => {
        window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/google`;
    };

    return (
        <div className="signup-container">
            <h2>Registrarse</h2>
            <button className="google-btn" onClick={handleGoogleSignUp}>
                <img src="/images/google-icon.png" alt="Google logo" className="google-icon" />
                Continuar con Google
            </button>
            {isNewUser && promotionCode && (
                <PromotionModal promotionCode={promotionCode} onClose={() => setIsNewUser(false)} />
            )}
        </div>
    );
};

export default Signup;
