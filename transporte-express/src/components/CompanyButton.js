import React from 'react';
import './CompanyButton.css';

const CompanyButton = ({ logo, name }) => {
    return (
        <div className="company-button">
            <img src={logo} alt={`Logo de ${name}`} className="company-logo" />
            <div className="company-name">{name}</div>
        </div>
    );
};

export default CompanyButton;
