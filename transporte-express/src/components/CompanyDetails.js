import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CompanyDetails.css';

const CompanyDetails = () => {
    const { id } = useParams();
    const [company, setCompany] = useState(null);
    const API_URL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        fetch(`${API_URL}/api/transport-companies/${id}`)
            .then(response => response.json())
            .then(data => setCompany(data))
            .catch(error => console.error('Error fetching company details:', error));
    }, [id, API_URL]);

    if (!company) return <p>Loading...</p>;

    const handleBuyClick = (route) => {
        const message = `Hola, quisiera comprar un pasaje para la ruta ${route.origin} a ${route.destination} con la empresa ${company.name}.`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/51960576738?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="company-details-container">
            <div className="company-header">
                <img src={company.logoUrl} alt={company.name} className="company-details-logo" />
                <h2>{company.name}</h2>
                <p>{company.description}</p>
            </div>
            <div className="routes-section">
                <h3>Rutas terrestres más reservadas desde {company.name}</h3>
                {company.Routes.map(route => (
                    <div key={route.id} className="route-card">
                        <div className="route-info">
                            <div className="route-time">
                                <p><strong>Salida:</strong> {route.departureTime}</p>
                                <p><strong>Llegada:</strong> {route.arrivalTime}</p>
                            </div>
                            <div className="route-location">
                                <p><strong>Origen:</strong> {route.origin}</p>
                                <p><strong>Destino:</strong> {route.destination}</p>
                            </div>
                        </div>
                        <div className="route-price">
                            <p>Servicio Especial</p>
                            <p>Desde <strong>S/{company.price}</strong></p>
                            <button className="buy-button" onClick={() => handleBuyClick(route)}>Comprar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CompanyDetails;
