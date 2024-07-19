import React, { useState, useEffect, useContext } from 'react';
import GoogleButton from './GoogleButton';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Loginn = () => {
    const [promotionCode, setPromotionCode] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            navigate('/'); // Si el usuario está autenticado, redirige a la página principal
        } else {
            const queryParams = new URLSearchParams(window.location.search);
            const promoCode = queryParams.get('promoCode');
            const errorParam = queryParams.get('error');

            if (promoCode && !localStorage.getItem('promoCodeShown')) {
                setPromotionCode(promoCode);
                localStorage.setItem('promoCodeShown', 'true');
                navigate('/'); // Considerar redirigir inmediatamente o después de algún evento
            }

            if (errorParam) {
                setError('Usuario no registrado');
            }
        }
    }, [navigate, user]);

    const closeModal = () => {
        setPromotionCode(null);
    };

    return (
        <div className="login-container">
            <h2>Iniciar sesión</h2>
            <GoogleButton />

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {promotionCode && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <h3>¡Bienvenido! Aquí está tu código de promoción:</h3>
                        <p>{promotionCode}</p>
                        <button onClick={() => {
                            navigator.clipboard.writeText(promotionCode);
                            alert('Código copiado al portapapeles');
                        }}>Copiar código</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Loginn;
