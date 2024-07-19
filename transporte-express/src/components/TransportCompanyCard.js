// src/components/TransportCompanyCard.js

import React from 'react';
import './TransportCompanyCard.css';

const TransportCompanyCard = ({ company }) => {
    return (
        <div className="company-card">
            <img src={company.logoUrl} alt={`${company.name} logo`} className="company-logo" />
            <h3>{company.name}</h3>
            <p>{company.description}</p>
            <div className="routes">
                {company.routes.map((route, index) => (
                    <div key={index} className="route">
                        <span>{route.origin} → {route.destination}</span>
                        <span>{route.departureTime} - {route.arrivalTime}</span>
                    </div>
                ))}
            </div>
            <p className="price">Desde S/{company.price}</p>
        </div>
    );
};

export default TransportCompanyCard;
