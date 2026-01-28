// utils/api.ts

import type { ApiResponse, Cliente, ClienteFormData } from '../types';
import {
    obtenerClientesMock,
    obtenerClientePorIdMock,
    crearClienteMock,
    actualizarClienteMock,
    eliminarClienteMock
} from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// ============================================
// CONFIGURACIÓN DE MODO MOCK
// ============================================
// Cambia esto a false cuando quieras usar el backend real
const USE_MOCK_DATA = true;

export interface RequestOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    body?: any;
    requiresAuth?: boolean;
}

// Función genérica para hacer peticiones a la API
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

// ============================================
// FUNCIONES PARA AUTENTICACIÓN
// ============================================

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

// ============================================
// FUNCIONES PARA MÓDULO DE CLIENTES
// ============================================

/**
 * Obtener todos los clientes
 */
export const obtenerClientesApi = async (): Promise<ApiResponse<Cliente[]>> => {
    if (USE_MOCK_DATA) {
        try {
            const clientes = await obtenerClientesMock();
            return {
                success: true,
                data: clientes,
                message: 'Clientes obtenidos exitosamente'
            };
        } catch (error) {
            return {
                success: false,
                error: 'Error al obtener clientes mock',
                message: 'Error al cargar los datos de prueba'
            };
        }
    }

    return apiRequest<Cliente[]>('/clientes', {
        method: 'GET',
    });
};

/**
 * Obtener un cliente por ID
 */
export const obtenerClientePorIdApi = async (id: number): Promise<ApiResponse<Cliente>> => {
    if (USE_MOCK_DATA) {
        try {
            const cliente = await obtenerClientePorIdMock(id);
            if (cliente) {
                return {
                    success: true,
                    data: cliente,
                    message: 'Cliente obtenido exitosamente'
                };
            } else {
                return {
                    success: false,
                    error: 'Cliente no encontrado',
                    message: 'No se encontró el cliente solicitado'
                };
            }
        } catch (error) {
            return {
                success: false,
                error: 'Error al obtener cliente mock',
                message: 'Error al cargar los datos de prueba'
            };
        }
    }

    return apiRequest<Cliente>(`/clientes/${id}`, {
        method: 'GET',
    });
};

/**
 * Crear un nuevo cliente
 */
export const crearClienteApi = async (clienteData: ClienteFormData): Promise<ApiResponse<Cliente>> => {
    if (USE_MOCK_DATA) {
        try {
            const dataToSend = {
                ...clienteData,
                id_usuario: 1, // Valor temporal
            };

            const nuevoCliente = await crearClienteMock(dataToSend);
            return {
                success: true,
                data: nuevoCliente,
                message: 'Cliente creado exitosamente'
            };
        } catch (error) {
            return {
                success: false,
                error: 'Error al crear cliente mock',
                message: 'Error al crear el cliente de prueba'
            };
        }
    }

    // Por ahora enviamos id_usuario como null o 1, después se ajusta
    const dataToSend = {
        ...clienteData,
        id_usuario: 1, // Valor temporal, después se manejará correctamente
    };

    return apiRequest<Cliente>('/clientes', {
        method: 'POST',
        body: dataToSend,
    });
};

/**
 * Actualizar un cliente existente
 */
export const actualizarClienteApi = async (
    id: number,
    clienteData: ClienteFormData
): Promise<ApiResponse<Cliente>> => {
    if (USE_MOCK_DATA) {
        try {
            const dataToSend = {
                ...clienteData,
                id_usuario: 1, // Valor temporal
            };

            const clienteActualizado = await actualizarClienteMock(id, dataToSend);
            
            if (clienteActualizado) {
                return {
                    success: true,
                    data: clienteActualizado,
                    message: 'Cliente actualizado exitosamente'
                };
            } else {
                return {
                    success: false,
                    error: 'Cliente no encontrado',
                    message: 'No se pudo actualizar el cliente'
                };
            }
        } catch (error) {
            return {
                success: false,
                error: 'Error al actualizar cliente mock',
                message: 'Error al actualizar el cliente de prueba'
            };
        }
    }

    const dataToSend = {
        ...clienteData,
        id_usuario: 1, // Valor temporal
    };

    return apiRequest<Cliente>(`/clientes/${id}`, {
        method: 'PUT',
        body: dataToSend,
    });
};

/**
 * Eliminar un cliente
 */
export const eliminarClienteApi = async (id: number): Promise<ApiResponse<void>> => {
    if (USE_MOCK_DATA) {
        try {
            const eliminado = await eliminarClienteMock(id);
            
            if (eliminado) {
                return {
                    success: true,
                    message: 'Cliente eliminado exitosamente'
                };
            } else {
                return {
                    success: false,
                    error: 'Cliente no encontrado',
                    message: 'No se pudo eliminar el cliente'
                };
            }
        } catch (error) {
            return {
                success: false,
                error: 'Error al eliminar cliente mock',
                message: 'Error al eliminar el cliente de prueba'
            };
        }
    }

    return apiRequest<void>(`/clientes/${id}`, {
        method: 'DELETE',
    });
};