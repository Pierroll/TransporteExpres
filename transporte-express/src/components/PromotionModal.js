import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PromotionModal.css';

const PromotionModal = ({ promotionCode, onClose }) => {
    const navigate = useNavigate();

    const handleCopy = () => {
        navigator.clipboard.writeText(promotionCode);
        alert('Código copiado al portapapeles!');
    };

    const handleClose = () => {
        onClose();
        navigate('/');
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>¡Bienvenido!</h2>
                <p>Tu código de promoción es:</p>
                <div className="promotion-code">{promotionCode}</div>
                <button onClick={handleCopy}>Copiar código</button>
                <button onClick={handleClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default PromotionModal;
