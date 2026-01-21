import React, { useState, useEffect } from 'react';
import { LoginPage } from './pages';
import type { AppState, User } from './types';
import { getAuthToken, clearAuthToken } from './utils/validators';
import './App.css';
import { LogOut } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    isAuthenticated: false,
    user: null,
    isLoading: true, // Iniciar con loading para verificar token
    error: null,
  });

  // Verificar autenticación al cargar
  useEffect(() => {
    const verifyAuth = async () => {
      const token = getAuthToken();
      const userData = localStorage.getItem('erp_user') || sessionStorage.getItem('erp_user');

      if (token && userData) {
        try {
          // En una app real, aquí validarías el token con el backend
          // const response = await validateTokenApi();

          // Por ahora, simulamos validación exitosa
          await new Promise(resolve => setTimeout(resolve, 500));

          const user: User = JSON.parse(userData);
          setAppState({
            isAuthenticated: true,
            user,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          // Token inválido, limpiar
          clearAuthToken();
          setAppState({
            isAuthenticated: false,
            user: null,
            isLoading: false,
            error: null,
          });
        }
      } else {
        setAppState(prev => ({ ...prev, isLoading: false }));
      }
    };

    verifyAuth();
  }, []);

  const handleLoginSuccess = (userData: any) => {
    setAppState({
      isAuthenticated: true,
      user: userData.user,
      isLoading: false,
      error: null,
    });
  };

  const handleLogout = () => {
    clearAuthToken();
    setAppState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null,
    });
  };

  if (appState.isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Verificando sesión...</p>
      </div>
    );
  }

  return (
    <div className="app">
      {appState.isAuthenticated ? (
        <div className="dashboard">
          <header className="app-header">
            <div className="header-content">
              <h1>REMSYSTEM - ERP v1.0</h1>
              <div className="header-info">
                <span className="welcome-text">
                  Bienvenido, <strong>{appState.user?.name}</strong>
                </span>
                <span className="user-role">
                  Rol: {appState.user?.role}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="logout-button"
            >
              <LogOut size={12}/>
              Cerrar Sesión
            </button>
          </header>

          <main className="app-main">
            <div className="dashboard-welcome">
              {/* <div className="welcome-card">
                <div className="welcome-icon">
                  
                </div>
                <h2>¡Bienvenido a REMSYSTEM - ERP!</h2>
                <p className="welcome-subtitle">
                  Has iniciado sesión como <strong>{appState.user?.role}</strong>
                </p>
                <div className="welcome-stats">
                  <div className="stat-card">
                    <span className="stat-number">12</span>
                    <span className="stat-label">Órdenes Pendientes</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-number">5</span>
                    <span className="stat-label">Notificaciones</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-number">3</span>
                    <span className="stat-label">Tareas Urgentes</span>
                  </div>
                </div>
                <div className="welcome-actions">
                  <button className="primary-action">
                    Ir al Dashboard
                  </button>
                  <button className="secondary-action">
                    Ver Tutorial
                  </button>
                </div>
              </div> */}

              <div className="quick-links">
                <h3>Panel principal</h3>
                <div className="links-grid">
                  <a className="quick-link">
                    <span>📊</span>
                    Ventas
                  </a>
                  <a className="quick-link">
                    <span>📦</span>
                    Inventario
                  </a>
                  <a href="/clientes" className="quick-link Activ">
                    <span>👥</span>
                    Clientes
                  </a>
                  <a className="quick-link">
                    <span>📈</span>
                    Reportes
                  </a>
                </div>
              </div>
            </div>
          </main>

          <footer className="app-footer">
            <p>REMSYSTEM - ERP v1.0 © 2026</p>
            <div className="footer-links">
              <a href="/help">Ayuda</a>
              <a href="/privacy">Privacidad</a>
              <a href="/terms">Términos</a>
            </div>
          </footer>
        </div>
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default App;