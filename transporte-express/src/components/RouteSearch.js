import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RouteSearch.css';

const RouteSearch = ({ onSearch }) => {
    const [origins, setOrigins] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [selectedOrigin, setSelectedOrigin] = useState('');
    const [selectedDestination, setSelectedDestination] = useState('');
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch origins from the backend
        fetch(`${BACKEND_URL}/api/origins`)
            .then(response => response.json())
            .then(data => setOrigins(data))
            .catch(error => console.error('Error fetching origins:', error));
    }, [BACKEND_URL]);

    useEffect(() => {
        if (selectedOrigin) {
            // Fetch destinations based on the selected origin
            fetch(`${BACKEND_URL}/api/destinations?origin=${selectedOrigin}`)
                .then(response => response.json())
                .then(data => setDestinations(data))
                .catch(error => console.error('Error fetching destinations:', error));
        }
    }, [selectedOrigin, BACKEND_URL]);

    const handleSearch = () => {
        onSearch(selectedOrigin, selectedDestination);
    };

    const handleResultClick = (companyId) => {
        navigate(`/company/${companyId}`);
    };

    return (
        <div className="route-search">
            <div className="route-search-field">
                <label htmlFor="origin">¿De dónde partes?</label>
                <select id="origin" value={selectedOrigin} onChange={(e) => setSelectedOrigin(e.target.value)}>
                    <option value="">Seleccione un origen</option>
                    {origins.map(origin => (
                        <option key={origin} value={origin}>{origin}</option>
                    ))}
                </select>
            </div>
            <div className="route-search-field">
                <label htmlFor="destination">¿A dónde quieres ir?</label>
                <select id="destination" value={selectedDestination} onChange={(e) => setSelectedDestination(e.target.value)}>
                    <option value="">Seleccione un destino</option>
                    {destinations.map(destination => (
                        <option key={destination} value={destination}>{destination}</option>
                    ))}
                </select>
            </div>
            <button className="route-search-button" onClick={handleSearch}>Buscar</button>

            {/* Mostrar resultados de la búsqueda */}
            <div className="routes-list">
                {routes.map(route => (
                    <div key={route.id} className="route-item" onClick={() => handleResultClick(route.TransportCompany.id)}>
                        <h3>{route.origin} - {route.destination}</h3>
                        <p>{route.TransportCompany.name}</p>
                        <p>Salida: {route.departureTime}</p>
                        <p>Llegada: {route.arrivalTime}</p>
                        <p>Precio: S/{route.TransportCompany.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RouteSearch;
