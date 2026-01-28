// utils/mockData.ts

import type { Cliente } from '../types';

// Datos de ejemplo para probar sin backend
export const clientesMock: Cliente[] = [
    {
        id_cliente: 1,
        id_usuario: 1,
        domicilio_fiscal: 'Av. Javier Prado Este 4200, San Borja',
        distrito: 'San Borja',
        provincia: 'Lima',
        departamento: 'Lima',
        pais: 'Perú',
        fecha_inicio_actividades: '2020-03-15',
        tipo_cliente: 'Empresa'
    },
    {
        id_cliente: 2,
        id_usuario: 2,
        domicilio_fiscal: 'Av. La Marina 2000, San Miguel',
        distrito: 'San Miguel',
        provincia: 'Lima',
        departamento: 'Lima',
        pais: 'Perú',
        fecha_inicio_actividades: '2019-07-22',
        tipo_cliente: 'Empresa'
    },
    {
        id_cliente: 3,
        id_usuario: 3,
        domicilio_fiscal: 'Jr. De la Unión 500, Cercado de Lima',
        distrito: 'Cercado de Lima',
        provincia: 'Lima',
        departamento: 'Lima',
        pais: 'Perú',
        fecha_inicio_actividades: '2021-01-10',
        tipo_cliente: 'Empresa'
    },
    {
        id_cliente: 4,
        id_usuario: 4,
        domicilio_fiscal: 'Av. Benavides 1555, Miraflores',
        distrito: 'Miraflores',
        provincia: 'Lima',
        departamento: 'Lima',
        pais: 'Perú',
        fecha_inicio_actividades: '2018-11-05',
        tipo_cliente: 'Empresa'
    },
    {
        id_cliente: 5,
        id_usuario: 5,
        domicilio_fiscal: 'Av. Universitaria 1801, San Miguel',
        distrito: 'San Miguel',
        provincia: 'Lima',
        departamento: 'Lima',
        pais: 'Perú',
        fecha_inicio_actividades: '2022-02-28',
        tipo_cliente: 'Empresa'
    }
];

// Variable para simular el storage local de clientes
let clientesStorage: Cliente[] = [...clientesMock];

// Contador para IDs nuevos
let nextId = 6;

/**
 * Simula obtener todos los clientes
 */
export const obtenerClientesMock = async (): Promise<Cliente[]> => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return [...clientesStorage];
};

/**
 * Simula obtener un cliente por ID
 */
export const obtenerClientePorIdMock = async (id: number): Promise<Cliente | null> => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const cliente = clientesStorage.find(c => c.id_cliente === id);
    return cliente || null;
};

/**
 * Simula crear un nuevo cliente
 */
export const crearClienteMock = async (clienteData: Omit<Cliente, 'id_cliente'>): Promise<Cliente> => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const nuevoCliente: Cliente = {
        ...clienteData,
        id_cliente: nextId++
    };
    
    clientesStorage.push(nuevoCliente);
    return nuevoCliente;
};

/**
 * Simula actualizar un cliente existente
 */
export const actualizarClienteMock = async (id: number, clienteData: Partial<Cliente>): Promise<Cliente | null> => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const index = clientesStorage.findIndex(c => c.id_cliente === id);
    
    if (index === -1) {
        return null;
    }
    
    clientesStorage[index] = {
        ...clientesStorage[index],
        ...clienteData,
        id_cliente: id // Asegurar que el ID no cambie
    };
    
    return clientesStorage[index];
};

/**
 * Simula eliminar un cliente
 */
export const eliminarClienteMock = async (id: number): Promise<boolean> => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const index = clientesStorage.findIndex(c => c.id_cliente === id);
    
    if (index === -1) {
        return false;
    }
    
    clientesStorage.splice(index, 1);
    return true;
};

/**
 * Resetear datos a su estado inicial (útil para testing)
 */
export const resetearClientesMock = () => {
    clientesStorage = [...clientesMock];
    nextId = 6;
};