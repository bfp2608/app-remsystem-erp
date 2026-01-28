import React, { useState, useEffect } from 'react';
import { LoginPage } from './pages';
import ClientesPage from './pages/ClientesPage';
import type { AppState, User } from './types';
import { getAuthToken, clearAuthToken } from './utils/validators';
import './App.css';
import './styles/clientes.css';
import { LogOut } from 'lucide-react';


const App: React.FC = () => {
  // Estado para manejar qué página mostrar
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'clientes'>('dashboard');

  const [appState, setAppState] = useState<AppState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
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
    setCurrentPage('dashboard'); // Volver al dashboard
    setAppState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null,
    });
  };

  // Función para navegar a Clientes
  const handleNavigateToClientes = () => {
    setCurrentPage('clientes');
  };

  // Función para volver al Dashboard
  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
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
            {/* Mostrar Dashboard o Clientes según el estado */}
            {currentPage === 'dashboard' && (
              <div className="dashboard-welcome">
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
                    <a 
                      className="quick-link Activ"
                      onClick={handleNavigateToClientes}
                      style={{ cursor: 'pointer' }}
                    >
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
            )}

            {currentPage === 'clientes' && (
              <ClientesPage onBack={handleBackToDashboard} />
            )}
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