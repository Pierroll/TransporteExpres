// TransportCompanies.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './TransportCompanies.css';

const TransportCompanies = () => {
    const [companies, setCompanies] = useState([]);
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

    useEffect(() => {
        fetch(`${BACKEND_URL}/api/transport-companies`)
            .then(response => response.json())
            .then(data => {
                setCompanies(data);
            })
            .catch(error => {
                console.error('Error fetching companies:', error);
            });
    }, [BACKEND_URL]);

    return (
        <div className="companies-container">
            <h2>Operadores Terrestres Tingo María</h2>
            <div className="companies-grid">
                {companies.map(company => (
                    <Link to={`/company/${company.id}`} key={company.id} className="company-card-link">
                        <div className="company-card">
                            <img src={company.logoUrl} alt={company.name} className="company-logo" />
                            <h3 className="company-name">{company.name}</h3>
                            <p className="company-description">{company.description}</p>
                            <p className="company-details">Detalles y precios</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TransportCompanies;
