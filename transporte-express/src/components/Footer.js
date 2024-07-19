import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Travel's Go</h3>
                    <p>Travel's Go es el mayor servicio de compra de pasajes de auto en línea en la Amazonía peruana, garantizado por 
                        miles de usuarios felices y satisfechos. Travel's Go ofrece la compra de pasajes de auto a través de su página
                        web para todas las rutas más importantes en la región de Tingo María y alrededores. Nuestra plataforma te 
                        permite encontrar y comparar precios de manera rápida y segura, brindándote la mejor experiencia de viaje en la 
                        selva peruana.</p>
                </div>
                <div className="footer-section">
                    <h3>Acerca de Travel's Go </h3>
                    <ul>
                        <li>Acerca de nosotros</li>
                        <li>Contáctanos</li>
                        <li>Empresas</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Info</h3>
                    <ul>
                        <li>Términos y condiciones</li>
                        <li>Política de Privacidad</li>
                        <li>Política de Cookies</li>
                        <li>Libro reclamaciones</li>
                        <li>Políticas de Reembolso</li>
                        <li>Preguntas frecuentes</li>
                        <li>Registro de agentes</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Sitios Locales</h3>
                    <ul>
                        <li>Tingo María</li>
                        <li>Tocache</li>
                        <li>Lima</li>
                        <li>Huánuco</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Síguenos</h3>
                    <a href="https://www.facebook.com/profile.php?id=61559624679136&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="facebook-button">
                        <img src="/images/facebook-icon.png" alt="Facebook" className="facebook-icon" />
                        Síguenos en Facebook
                    </a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2024 Travel's Go. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
