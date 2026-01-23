// pages/ClientesPage.tsx

import React, { useState, useEffect } from 'react';
import { Plus, ArrowLeft } from 'lucide-react';
import ClienteTable from '../components/ClienteTable';
import ClienteForm from '../components/ClienteForm';
import { ToastContainer } from '../components/Toast';
import type { Cliente, ClienteFormData, ToastMessage } from '../types';
import {
    obtenerClientesApi,
    crearClienteApi,
    actualizarClienteApi,
    eliminarClienteApi
} from '../utils/api';

interface ClientesPageProps {
    onBack: () => void;
}

const ClientesPage: React.FC<ClientesPageProps> = ({ onBack }) => {
    // Estados principales
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [clienteToEdit, setClienteToEdit] = useState<Cliente | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    // Cargar clientes al montar el componente
    useEffect(() => {
        cargarClientes();
    }, []);

    // Función para cargar todos los clientes
    const cargarClientes = async () => {
        setIsLoading(true);
        try {
            const response = await obtenerClientesApi();
            
            if (response.success && response.data) {
                // Manejar si viene como array directo o dentro de data
                const clientesData = Array.isArray(response.data) 
                    ? response.data 
                    : response.data;
                
                setClientes(clientesData);
            } else {
                mostrarToast('Error al cargar clientes', 'error');
            }
        } catch (error) {
            console.error('Error cargando clientes:', error);
            mostrarToast('Error al cargar clientes', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    // Función para crear nuevo cliente
    const handleCrearCliente = async (data: ClienteFormData) => {
        setIsSubmitting(true);
        try {
            const response = await crearClienteApi(data);
            
            if (response.success) {
                mostrarToast('Cliente creado exitosamente', 'success');
                setShowForm(false);
                cargarClientes(); // Recargar lista
            } else {
                mostrarToast(response.error || 'Error al crear cliente', 'error');
            }
        } catch (error) {
            console.error('Error creando cliente:', error);
            mostrarToast('Error al crear cliente', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Función para actualizar cliente existente
    const handleActualizarCliente = async (data: ClienteFormData) => {
        if (!clienteToEdit) return;

        setIsSubmitting(true);
        try {
            const response = await actualizarClienteApi(clienteToEdit.id_cliente, data);
            
            if (response.success) {
                mostrarToast('Cliente actualizado exitosamente', 'success');
                setShowForm(false);
                setClienteToEdit(null);
                cargarClientes(); // Recargar lista
            } else {
                mostrarToast(response.error || 'Error al actualizar cliente', 'error');
            }
        } catch (error) {
            console.error('Error actualizando cliente:', error);
            mostrarToast('Error al actualizar cliente', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Función para eliminar cliente
    const handleEliminarCliente = async (id: number) => {
        try {
            const response = await eliminarClienteApi(id);
            
            if (response.success) {
                mostrarToast('Cliente eliminado exitosamente', 'success');
                cargarClientes(); // Recargar lista
            } else {
                mostrarToast(response.error || 'Error al eliminar cliente', 'error');
            }
        } catch (error) {
            console.error('Error eliminando cliente:', error);
            mostrarToast('Error al eliminar cliente', 'error');
        }
    };

    // Función para abrir formulario de edición
    const handleEditarCliente = (cliente: Cliente) => {
        setClienteToEdit(cliente);
        setShowForm(true);
    };

    // Función para abrir formulario de creación
    const handleNuevoCliente = () => {
        setClienteToEdit(null);
        setShowForm(true);
    };

    // Función para cancelar formulario
    const handleCancelarFormulario = () => {
        setShowForm(false);
        setClienteToEdit(null);
    };

    // Función para manejar submit del formulario
    const handleSubmitFormulario = (data: ClienteFormData) => {
        if (clienteToEdit) {
            handleActualizarCliente(data);
        } else {
            handleCrearCliente(data);
        }
    };

    // Función para mostrar notificaciones toast
    const mostrarToast = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
        const newToast: ToastMessage = {
            id: Date.now().toString(),
            message,
            type
        };
        setToasts(prevToasts => [...prevToasts, newToast]);
    };

    // Función para cerrar un toast específico
    const cerrarToast = (id: string) => {
        setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
    };

    return (
        <div className="clientes-page">
            {/* Header de la página */}
            <div className="page-header">
                <div className="header-left">
                    <button 
                        className="button-back"
                        onClick={onBack}
                    >
                        <ArrowLeft size={20} />
                        Volver
                    </button>
                    <h1>Gestión de Clientes</h1>
                </div>
                <button 
                    className="button-primary"
                    onClick={handleNuevoCliente}
                >
                    <Plus size={20} />
                    Nuevo Cliente
                </button>
            </div>

            {/* Tabla de clientes */}
            <div className="page-content">
                <ClienteTable
                    clientes={clientes}
                    onEdit={handleEditarCliente}
                    onDelete={handleEliminarCliente}
                    isLoading={isLoading}
                />
            </div>

            {/* Modal de formulario */}
            {showForm && (
                <ClienteForm
                    clienteToEdit={clienteToEdit}
                    onSubmit={handleSubmitFormulario}
                    onCancel={handleCancelarFormulario}
                    isLoading={isSubmitting}
                />
            )}

            {/* Notificaciones Toast */}
            <ToastContainer
                toasts={toasts}
                onClose={cerrarToast}
            />
        </div>
    );
};

export default ClientesPage;