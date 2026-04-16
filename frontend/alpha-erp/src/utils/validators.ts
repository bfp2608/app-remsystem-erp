// Utilidades de validación
export const emailValidator = (email: string): string | null => {
    if (!email.trim()) {
        return 'El email es requerido';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Email inválido';
    }

    return null;
};

export const passwordValidator = (password: string): string | null => {
    if (!password) {
        return 'La contraseña es requerida';
    }

    if (password.length < 8) {
        return 'La contraseña debe tener al menos 8 caracteres';
    }

    if (!/(?=.*[A-Z])/.test(password)) {
      return 'Debe contener al menos una mayúscula';
    }

    return null;
};

export const validateLoginForm = (email: string, password: string): Record<string, string> => {
    const errors: Record<string, string> = {};

    const emailError = emailValidator(email);
    if (emailError) errors.email = emailError;

    const passwordError = passwordValidator(password);
    if (passwordError) errors.password = passwordError;

    return errors;
};

export const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
};

export const handlePressKey = (e) => {
  const allowedKeys = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "Tab",
    "Home",
    "End"
  ];

  // Permitir Ctrl + cualquier tecla (Ctrl+V, Ctrl+C, etc.)
  if (e.ctrlKey || e.metaKey) return;

  // Permitir números
  if (/^[0-9]$/.test(e.key)) return;

  // Permitir teclas de control
  if (allowedKeys.includes(e.key)) return;

  e.preventDefault();
};

// Validador de campos obligatorios
export const requiredValidator = (value: string | number | null | undefined, fieldName: string): string | null => {
    
    if (value === null || value === undefined) {
        return `El campo ${fieldName} es obligatorio`;
    }
    
    if (typeof value === 'string' && !value.trim()) {
        return `El campo ${fieldName} es obligatorio`;
    }

    return null;
};

// // Utilidad para guardar tokens
// export const saveAuthToken = (token: string): void => {
//     localStorage.setItem('erp_token', token);
// };

// export const getAuthToken = (): string | null => {
//     return localStorage.getItem('erp_token') || sessionStorage.getItem('erp_token');
// };

// export const clearAuthToken = (): void => {
//     localStorage.removeItem('erp_token');
//     sessionStorage.removeItem('erp_token');
//     localStorage.removeItem('erp_user');
//     sessionStorage.removeItem('erp_user');
// };

// Utilidad para formatear fechas