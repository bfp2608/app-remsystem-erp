import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import type{ LoginFormData, LoginResponse, User } from '../types';
import '../styles/login.css';

interface LoginPageProps {
    onLoginSuccess: (response: LoginResponse) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    // Función para simular login (reemplazar con llamada real a API)
    const mockLoginApi = async (data: LoginFormData): Promise<LoginResponse> => {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Credenciales de ejemplo (en producción, verificar con backend)
        const validCredentials = [
            { email: 'admin@erp.com', password: 'admin123', role: 'admin' as const },
            // { email: 'usuario@erp.com', password: 'user123', role: 'user' as const },
            // { email: 'gerente@erp.com', password: 'manager123', role: 'manager' as const },
        ];

        const userCredential = validCredentials.find(
            cred => cred.email === data.email && cred.password === data.password
        );

        if (!userCredential) {
            throw new Error('Credenciales inválidas.');
        }

        // Crear usuario simulado
        const user: User = {
            id: '1',
            email: userCredential.email,
            name: userCredential.email.split('@')[0],
            role: userCredential.role,
            lastLogin: new Date(),
        };

        return {
            user,
            token: 'mock-jwt-token-' + Math.random().toString(36).substr(2),
            expiresIn: 3600,
        };
    };

    const handleLoginSubmit = async (formData: LoginFormData) => {
        setIsLoading(true);
        setError('');

        try {
            // Aquí llamarías a tu API real
            const response = await mockLoginApi(formData);

            // Guardar en localStorage si el usuario marcó "Recordarme"
            if (formData.rememberMe) {
                localStorage.setItem('erp_token', response.token);
                localStorage.setItem('erp_user', JSON.stringify(response.user));
            } else {
                sessionStorage.setItem('erp_token', response.token);
                sessionStorage.setItem('erp_user', JSON.stringify(response.user));
            }

            // Notificar al componente padre
            onLoginSuccess(response);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
            console.error('Login error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card fade-in">
                <LoginForm
                    onSubmit={handleLoginSubmit}
                    isLoading={isLoading}
                    error={error}
                />

                {/* Información de demostración */}
                <div className="demo-credentials">
                    <details className="mt-6" open>
                        <summary className="text-center" style={{
                            color: 'var(--gray-500)',
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            pointerEvents: 'none'
                        }}>
                            Credenciales de demostración
                        </summary>
                        <div className="mt-2" style={{
                            fontSize: '1rem',
                            color: 'var(--gray-600)',
                            background: 'var(--gray-100)',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)'
                        }}>
                            <p className='text-center' ><strong>Admin:</strong> admin@erp.com / admin123</p>
                            {/* <p><strong>Usuario:</strong> usuario@erp.com / user123</p>
                            <p><strong>Gerente:</strong> gerente@erp.com / manager123</p> */}
                        </div>
                    </details>
                </div>
            </div>

            {/* Efectos visuales de fondo */}
            <div className="background-effects">
                <div className="effect-circle effect-1"></div>
                <div className="effect-circle effect-2"></div>
                <div className="effect-circle effect-3"></div>
            </div>
        </div>
    );
};

export default LoginPage;