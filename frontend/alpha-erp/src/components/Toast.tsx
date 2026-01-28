// components/Toast.tsx

import React, { useEffect } from 'react';
import { X, CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';
import type { ToastMessage } from '../types';

interface ToastProps {
    toast: ToastMessage;
    onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
    // Auto-cerrar después de 4 segundos
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(toast.id);
        }, 4000);

        return () => clearTimeout(timer);
    }, [toast.id, onClose]);

    // Seleccionar ícono según el tipo
    const getIcon = () => {
        switch (toast.type) {
            case 'success':
                return <CheckCircle size={20} />;
            case 'error':
                return <XCircle size={20} />;
            case 'warning':
                return <AlertTriangle size={20} />;
            case 'info':
                return <Info size={20} />;
            default:
                return <Info size={20} />;
        }
    };

    return (
        <div className={`toast toast-${toast.type}`}>
            <div className="toast-icon">
                {getIcon()}
            </div>
            <div className="toast-message">
                {toast.message}
            </div>
            <button 
                className="toast-close"
                onClick={() => onClose(toast.id)}
                aria-label="Cerrar notificación"
            >
                <X size={16} />
            </button>
        </div>
    );
};

// Componente contenedor para múltiples toasts
interface ToastContainerProps {
    toasts: ToastMessage[];
    onClose: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
    if (toasts.length === 0) return null;

    return (
        <div className="toast-container">
            {toasts.map((toast) => (
                <Toast key={toast.id} toast={toast} onClose={onClose} />
            ))}
        </div>
    );
};

export default Toast;