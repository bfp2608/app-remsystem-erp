import React, { useState, useEffect } from 'react';
import { LoginPage } from './pages';
import type { AppState, User } from './types';
import { getAuthToken, clearAuthToken } from './utils/validators';
import './App.css';

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
              <h1>ERP System v1.0</h1>
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
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 17L21 12L16 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 12H9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Cerrar Sesión
            </button>
          </header>

          <main className="app-main">
            <div className="dashboard-welcome">
              <div className="welcome-card">
                <div className="welcome-icon">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                      stroke="var(--primary-color)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 22V12H15V22"
                      stroke="var(--primary-color)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2>¡Bienvenido al Sistema ERP!</h2>
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
              </div>

              <div className="quick-links">
                <h3>Accesos Rápidos</h3>
                <div className="links-grid">
                  <a href="/ventas" className="quick-link">
                    <span>📊</span>
                    Ventas
                  </a>
                  <a href="/inventario" className="quick-link">
                    <span>📦</span>
                    Inventario
                  </a>
                  <a href="/clientes" className="quick-link">
                    <span>👥</span>
                    Clientes
                  </a>
                  <a href="/reportes" className="quick-link">
                    <span>📈</span>
                    Reportes
                  </a>
                </div>
              </div>
            </div>
          </main>

          <footer className="app-footer">
            <p>Sistema ERP v1.0 © 2024 - {new Date().getFullYear()}</p>
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