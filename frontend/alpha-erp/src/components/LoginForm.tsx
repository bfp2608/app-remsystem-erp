import React, { useState } from 'react';
import InputField from './InputField';
import  PasswordField from './PasswordField';
import { LoginFormProps, LoginFormData, LoginFormErrors } from '../types';

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading, error: generalError }) => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
        rememberMe: false,
    });

    const [errors, setErrors] = useState<LoginFormErrors>({});
    const [showPassword, setShowPassword] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: LoginFormErrors = {};

        // Validar email
        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        // Validar contraseña
        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        // Limpiar error específico cuando el usuario empieza a escribir
        if (errors[name as keyof LoginFormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
        if (generalError) {
            setErrors(prev => ({ ...prev, general: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await onSubmit(formData);
        } catch (error) {
            // El error será manejado por el componente padre
        }
    };

    const handleTogglePassword = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <form onSubmit={handleSubmit} className="login-form" noValidate>
            {/* Logo y título */}
            <div className="login-header">
                <div className="login-logo">
                    <span>ERP</span>
                </div>
                <h1 className="login-title">Bienvenido al Sistema</h1>
                <p className="login-subtitle">Ingresa tus credenciales para continuar</p>
            </div>

            {/* Error general */}
            {(generalError || errors.general) && (
                <div className="form-error general-error" role="alert">
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M7 4V7"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M7 10H7.005"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    {generalError || errors.general}
                </div>
            )}

            {/* Campo de email */}
            <InputField
                label="Correo Electrónico"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="usuario@empresa.com"
                error={errors.email}
                required
                autoComplete="username"
            />

            {/* Campo de contraseña */}
            <PasswordField
                label="Contraseña"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                error={errors.password}
                required
                showPassword={showPassword}
                onTogglePassword={handleTogglePassword}
                autoComplete="current-password"
            />

            {/* Recordarme y olvidé contraseña */}
            <div className="remember-forgot">
                <label className="remember-me">
                    <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                    />
                    <span>Recordarme</span>
                </label>
                <a href="/forgot-password" className="forgot-password">
                    ¿Olvidaste tu contraseña?
                </a>
            </div>

            {/* Botón de envío */}
            <button
                type="submit"
                className="login-button"
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <span className="loading-spinner"></span>
                        Iniciando sesión...
                    </>
                ) : (
                    'Iniciar Sesión'
                )}
            </button>

            {/* Separador */}
            <div className="login-separator">
                <span>o</span>
            </div>

            {/* Enlace de registro (opcional) */}
            <div className="login-footer">
                <p>
                    ¿No tienes una cuenta?{' '}
                    <a href="/register">Solicitar acceso</a>
                </p>
                <p className="mt-2">
                    <a href="/help">¿Necesitas ayuda?</a>
                </p>
            </div>
        </form>
    );
};

export default LoginForm;