// Tipos para el formulario de login
export interface LoginFormData {
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface LoginFormErrors {
    email?: string;
    password?: string;
    general?: string;
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'user' | 'manager';
    avatar?: string;
    lastLogin?: Date;
}

// Tipos para la respuesta de la API
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

export interface LoginResponse {
    user: User;
    token: string;
    expiresIn: number;
}

// Tipos para el estado de la aplicación
export interface AppState {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    error: string | null;
}

// Tipos para los props de componentes
export interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    error?: string;
    required?: boolean;
    autoComplete?: string;
}

export interface PasswordFieldProps extends InputFieldProps {
    showPassword: boolean;
    onTogglePassword: () => void;
}

export interface LoginFormProps {
    onSubmit: (data: LoginFormData) => Promise<void>;
    isLoading?: boolean;
    error?: string;
}