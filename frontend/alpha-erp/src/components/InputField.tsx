import React from 'react';
import type { InputFieldProps } from '../types';
import { CircleAlert } from 'lucide-react';

const InputField: React.FC<InputFieldProps> = ({
    label,
    type,
    name,
    value,
    onChange,
    placeholder,
    error,
    required = false,
    autoComplete,
}) => {
    return (
        <div className="form-group">
            <label htmlFor={name} className="form-label">
                {label}
                {required && <span className="required">*</span>}
            </label>
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className={`form-input ${error ? 'error' : ''}`}
                aria-invalid={!!error}
                aria-describedby={error ? `${name}-error` : undefined}
            />
            {error && (
                <div id={`${name}-error`} className="form-error" role="alert">
                    <CircleAlert size={12}/>
                    {error}
                </div>
            )}
        </div>
    );
};

export default InputField;