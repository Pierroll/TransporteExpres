// src/components/WhatsappButton.js
import React, { useState } from 'react';
import './WhatsappButton.css';

const WhatsappButton = ({ phoneNumber }) => {
    const [message, setMessage] = useState('');

    const handleClick = () => {
        const encodedMessage = encodeURIComponent(`Quisiera información de viajes a: ${message}`);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Abrir la primera URL
        window.open(whatsappUrl, '_blank');
        
        // Simular el segundo y tercer clic después de pequeños retrasos
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 500); // 500 milisegundos de retraso

        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 1000); // 1000 milisegundos de retraso
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 1500);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleClick();
        }
    };

    return (
        <div className="whatsapp-container">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Quisiera información de viajes a:"
                className="whatsapp-input"
                onKeyDown={handleKeyDown}
            />
            <div className="whatsapp-button" onClick={handleClick}>
                <img src="/images/whatsapp-icon.png" alt="WhatsApp" />
            </div>
        </div>
    );
};

export default WhatsappButton;
