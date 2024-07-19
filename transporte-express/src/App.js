// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import TransportCompanies from './components/TransportCompanies';
import CompanyDetails from './components/CompanyDetails';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loginn from './components/Loginn';
import Signup from './components/Signup';
import RouteSearch from './components/RouteSearch';
import { UserProvider } from './UserContext';
import './components/RouteSearch.css';
import WhatsappButton from './components/WhatsappButton';

const App = () => {
    const [user, setUser] = useState(null);
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/current_user', {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (data && data.user) {
                    setUser(data.user);
                }
            })
            .catch(error => {
                console.error("Error fetching current user:", error);
            });
    }, []);

    const handleSearch = (origin, destination) => {
        fetch(`http://localhost:5000/api/routes?origin=${origin}&destination=${destination}`)
            .then(response => response.json())
            .then(data => setRoutes(data))
            .catch(error => console.error('Error fetching routes:', error));
    };

    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

    return (
        <div className="App">
            <Navbar />
            {!isAuthPage && (
                <>
                    <header className="App-header">
                        <h1>Bienvenido a Travel's Go</h1>
                        <p>
                            Tu plataforma de confianza para encontrar y reservar pasajes de autos en Tingo María.
                            Nuestro objetivo es simplificar tu experiencia de viaje al ofrecerte una amplia selección
                            de empresas de transporte, horarios flexibles y los mejores precios del mercado.
                            Ya sea que viajes por negocios, placer o cualquier otra razón, aquí encontrarás la opción
                            perfecta que se adapte a tus necesidades.
                        </p>
                        {user && <p>Bienvenido, {user.name}</p>}
                    </header>
                    <RouteSearch onSearch={handleSearch} />
                    {routes.length > 0 && (
                        <div className="routes-list">
                            {routes.map(route => (
                                <div key={route.id} className="route-item" onClick={() => window.location.href = `/company/${route.TransportCompany.id}`}>
                                    <h3>{route.origin} - {route.destination}</h3>
                                    <p>{route.TransportCompany.name}</p>
                                    <p>Salida: {route.departureTime}</p>
                                    <p>Llegada: {route.arrivalTime}</p>
                                    <p>Precio: S/{route.TransportCompany.price}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
            <Routes>
                <Route path="/" element={<TransportCompanies />} />
                <Route path="/company/:id" element={<CompanyDetails />} />
                <Route path="/login" element={<Loginn />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
            <Footer />
            <WhatsappButton phoneNumber="51960576738" />
        </div>
    );
}

const AppWrapper = () => {
    return (
        <UserProvider>
            <Router>
                <App />
            </Router>
        </UserProvider>
    );
}

export default AppWrapper;
