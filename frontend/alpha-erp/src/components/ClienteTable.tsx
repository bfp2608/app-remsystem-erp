// components/ClienteTable.tsx

import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import type { Cliente } from '../types';

interface ClienteTableProps {
    clientes: Cliente[];
    onEdit: (cliente: Cliente) => void;
    onDelete: (id: number) => void;
    isLoading: boolean;
}

const ClienteTable: React.FC<ClienteTableProps> = ({
    clientes,
    onEdit,
    onDelete,
    isLoading
}) => {
    // Formatear fecha para mostrar
    const formatearFecha = (fecha: string | null): string => {
        if (!fecha) return '-';
        const date = new Date(fecha);
        return date.toLocaleDateString('es-PE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    // Manejar confirmación de eliminación
    const handleDeleteClick = (cliente: Cliente) => {
        const confirmar = window.confirm(
            `¿Está seguro de eliminar el cliente "${cliente.domicilio_fiscal || 'ID: ' + cliente.id_cliente}"?`
        );
        if (confirmar) {
            onDelete(cliente.id_cliente);
        }
    };

    if (isLoading) {
        return (
            <div className="table-loading">
                <div className="loading-spinner"></div>
                <p>Cargando clientes...</p>
            </div>
        );
    }

    if (clientes.length === 0) {
        return (
            <div className="table-empty">
                <p>No hay clientes registrados</p>
                <p className="table-empty-subtitle">Haz clic en "Nuevo Cliente" para agregar uno</p>
            </div>
        );
    }

    return (
        <div className="table-container">
            <table className="clientes-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Domicilio Fiscal</th>
                        <th>Distrito</th>
                        <th>Provincia</th>
                        <th>Departamento</th>
                        <th>País</th>
                        <th>Fecha Inicio</th>
                        <th>Tipo Cliente</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.id_cliente}>
                            <td>{cliente.id_cliente}</td>
                            <td>{cliente.domicilio_fiscal || '-'}</td>
                            <td>{cliente.distrito || '-'}</td>
                            <td>{cliente.provincia || '-'}</td>
                            <td>{cliente.departamento || '-'}</td>
                            <td>{cliente.pais || '-'}</td>
                            <td>{formatearFecha(cliente.fecha_inicio_actividades)}</td>
                            <td>
                                <span className="badge-tipo">
                                    {cliente.tipo_cliente}
                                </span>
                            </td>
                            <td>
                                <div className="table-actions">
                                    <button
                                        className="action-button action-edit"
                                        onClick={() => onEdit(cliente)}
                                        title="Editar cliente"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        className="action-button action-delete"
                                        onClick={() => handleDeleteClick(cliente)}
                                        title="Eliminar cliente"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClienteTable;