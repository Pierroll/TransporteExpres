import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { UserContext } from '../UserContext';

const Navbar = () => {
    const { user, setUser } = useContext(UserContext); // eslint-disable-line no-unused-vars
    const API_URL = process.env.REACT_APP_BACKEND_URL;

    const handleLogout = () => {
        window.location.href = `${API_URL}/logout`;
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">Travel's Go</div>
            <div className="navbar-links">
                <Link to="/">Inicio</Link>
                {user ? (
                    <>
                        <span>Bienvenido, {user.name}</span>
                        <button onClick={handleLogout}>Cerrar sesión</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Iniciar sesión</Link>
                        <Link to="/signup">Registrarse</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;