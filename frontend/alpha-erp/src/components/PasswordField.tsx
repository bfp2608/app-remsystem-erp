import React from 'react';
import { Eye, EyeOff,CircleAlert } from 'lucide-react';
import type { PasswordFieldProps } from '../types';


const PasswordField: React.FC<PasswordFieldProps> = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    error,
    required = false,
    showPassword,
    onTogglePassword,
    autoComplete = 'current-password',
}) => {
    return (
        <div className="form-group">
            <label htmlFor={name} className="form-label">
                {label}
                {required && <span className="required">*</span>}
            </label>
            <div className="password-container">
                <input
                    id={name}
                    type={showPassword ? 'text' : 'password'}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    className={`form-input ${error ? 'error' : ''}`}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${name}-error` : undefined}
                />
                <button
                    type="button"
                    onClick={onTogglePassword}
                    className="password-toggle"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    tabIndex={-1}
                >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
            </div>
            {error && (
                <div id={`${name}-error`} className="form-error" role="alert">
                    <CircleAlert size={12}/>
                    {error}
                </div>
            )}
        </div>
    );
};

export default PasswordField;