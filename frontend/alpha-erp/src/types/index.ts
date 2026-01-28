// types/index.ts

// Tipos existentes
export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'user' | 'manager';
    lastLogin: Date;
}

export interface LoginFormData {
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface LoginResponse {
    user: User;
    token: string;
    expiresIn: number;
}

export interface AppState {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    error: string | null;
}

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// ============================================
// NUEVOS TIPOS PARA MÓDULO DE CLIENTES
// ============================================

export interface Cliente {
    id_cliente: number;
    id_usuario: number; // Por ahora no se usa en el formulario
    domicilio_fiscal: string | null;
    distrito: string | null;
    provincia: string | null;
    departamento: string | null;
    pais: string | null;
    fecha_inicio_actividades: string | null; // Formato: YYYY-MM-DD
    tipo_cliente: 'Empresa' | 'Persona';
}

export interface ClienteFormData {
    domicilio_fiscal: string;
    distrito: string;
    provincia: string;
    departamento: string;
    pais: string;
    fecha_inicio_actividades: string;
    tipo_cliente: 'Empresa' | 'Persona';
    // id_usuario se manejará después con el backend
}

export interface ToastMessage {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
}