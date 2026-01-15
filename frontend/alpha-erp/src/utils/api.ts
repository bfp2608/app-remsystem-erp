// Configuración para llamadas a API (para usar cuando tengas backend)
import type { ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface RequestOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    body?: any;
    requiresAuth?: boolean;
}

export const apiRequest = async <T = any>(
    endpoint: string,
    options: RequestOptions = {}
): Promise<ApiResponse<T>> => {
    const {
        method = 'GET',
        headers = {},
        body,
        requiresAuth = true,
    } = options;

    const requestHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...headers,
    };

    // Agregar token de autenticación si es necesario
    if (requiresAuth) {
        const token = localStorage.getItem('erp_token') || sessionStorage.getItem('erp_token');
        if (token) {
            requestHeaders['Authorization'] = `Bearer ${token}`;
        }
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method,
            headers: requestHeaders,
            body: body ? JSON.stringify(body) : undefined,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
        }

        return {
            success: true,
            data: data.data || data,
            message: data.message,
        };
    } catch (error) {
        console.error('API request failed:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Error de conexión',
            message: 'No se pudo conectar con el servidor',
        };
    }
};

// Métodos específicos para login
export const loginApi = async (email: string, password: string) => {
    return apiRequest('/auth/login', {
        method: 'POST',
        body: { email, password },
        requiresAuth: false,
    });
};

export const logoutApi = async () => {
    return apiRequest('/auth/logout', {
        method: 'POST',
    });
};

export const validateTokenApi = async () => {
    return apiRequest('/auth/validate');
};