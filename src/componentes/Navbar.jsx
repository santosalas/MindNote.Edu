// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  // Verificar si hay usuario logueado
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="navbar businessmap-style">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-brand">
          <Link to="/" className="logo-link">
            <div className="logo-wrapper">
              <img 
                src="MindNote.edu/src/assets/logo.png" 
                alt="MindNote Logo" 
                className="logo-image"
              />
              <div className="logo-text"> 
                <span className="logo-main">MindNote</span>
                <span className="logo-domain">.edu</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Botón hamburguesa */}
        <button
          className={`menu-toggle ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Menú de Navegación */}
        <div className={`nav-content ${isOpen ? "active" : ""}`}>
          <ul className="nav-links">
            {/* Mostrar "Inicio" solo si NO estamos en la página principal */}
            {location.pathname !== "/" && (
              <li>
                <Link 
                  to="/" 
                  className="nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  Inicio
                </Link>
              </li>
            )}

            {/* Mostrar "Notas" solo si el usuario está logueado */}
            {user && (
              <li>
                <Link 
                  to="/notas" 
                  className={`nav-link ${location.pathname === "/notas" ? "active" : ""}`}
                  onClick={() => setIsOpen(false)}
                >
                  Mis Notas
                </Link>
              </li>
            )}

            {/* Mostrar "Admin" solo para administradores */}
            {user && user.rol === "Administrador" && (
              <li>
                <Link 
                  to="/admin" 
                  className={`nav-link ${location.pathname === "/admin" ? "active" : ""}`}
                  onClick={() => setIsOpen(false)}
                >
                  Panel Admin
                </Link>
              </li>
            )}
          </ul>

          {/* Sección de Autenticación */}
          <div className="nav-auth">
            {user ? (
              // Usuario logueado
              <div className="user-menu">
                <div className="user-info">
                  <span className="user-avatar">👤</span>
                  <span className="user-name">{user.nombre}</span>
                </div>
                <button onClick={handleLogout} className="logout-btn">
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              // Usuario NO logueado
              <div className="auth-buttons">
                <Link 
                  to="/login" 
                  className="auth-link login"
                  onClick={() => setIsOpen(false)}
                >
                  Iniciar Sesión
                </Link>
                <Link 
                  to="/register" 
                  className="auth-link register"
                  onClick={() => setIsOpen(false)}
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;