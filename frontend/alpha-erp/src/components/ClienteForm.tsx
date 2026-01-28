// components/ClienteForm.tsx

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Cliente, ClienteFormData } from '../types';
import {
    obtenerDepartamentos,
    obtenerProvinciasPorDepartamento,
    obtenerDistritosPorProvincia
} from '../utils/ubigeoData';

interface ClienteFormProps {
    clienteToEdit: Cliente | null;
    onSubmit: (data: ClienteFormData) => void;
    onCancel: () => void;
    isLoading: boolean;
}

const ClienteForm: React.FC<ClienteFormProps> = ({
    clienteToEdit,
    onSubmit,
    onCancel,
    isLoading
}) => {
    // Estado inicial del formulario
    const [formData, setFormData] = useState<ClienteFormData>({
        domicilio_fiscal: '',
        distrito: '',
        provincia: '',
        departamento: '',
        pais: 'Perú',
        fecha_inicio_actividades: '',
        tipo_cliente: 'Empresa'
    });

    // Estados para los selectores en cascada
    const [departamentos, setDepartamentos] = useState<string[]>([]);
    const [provincias, setProvincias] = useState<string[]>([]);
    const [distritos, setDistritos] = useState<string[]>([]);

    // Cargar departamentos al montar el componente
    useEffect(() => {
        const deps = obtenerDepartamentos();
        setDepartamentos(deps);
    }, []);

    // Cargar datos si estamos editando
    useEffect(() => {
        if (clienteToEdit) {
            setFormData({
                domicilio_fiscal: clienteToEdit.domicilio_fiscal || '',
                distrito: clienteToEdit.distrito || '',
                provincia: clienteToEdit.provincia || '',
                departamento: clienteToEdit.departamento || '',
                pais: clienteToEdit.pais || 'Perú',
                fecha_inicio_actividades: clienteToEdit.fecha_inicio_actividades || '',
                tipo_cliente: clienteToEdit.tipo_cliente || 'Empresa'
            });

            // Cargar provincias y distritos del cliente a editar
            if (clienteToEdit.departamento) {
                const provs = obtenerProvinciasPorDepartamento(clienteToEdit.departamento);
                setProvincias(provs);
            }

            if (clienteToEdit.departamento && clienteToEdit.provincia) {
                const dists = obtenerDistritosPorProvincia(
                    clienteToEdit.departamento,
                    clienteToEdit.provincia
                );
                setDistritos(dists);
            }
        }
    }, [clienteToEdit]);

    // Manejar cambios en los inputs normales
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Manejar cambio de departamento (cascada)
    const handleDepartamentoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const departamento = event.target.value;
        
        // Actualizar departamento en el formulario
        setFormData(prevData => ({
            ...prevData,
            departamento: departamento,
            provincia: '', // Resetear provincia
            distrito: ''   // Resetear distrito
        }));

        // Cargar provincias del departamento seleccionado
        if (departamento) {
            const provs = obtenerProvinciasPorDepartamento(departamento);
            setProvincias(provs);
        } else {
            setProvincias([]);
        }

        // Limpiar distritos
        setDistritos([]);
    };

    // Manejar cambio de provincia (cascada)
    const handleProvinciaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const provincia = event.target.value;
        
        // Actualizar provincia en el formulario
        setFormData(prevData => ({
            ...prevData,
            provincia: provincia,
            distrito: '' // Resetear distrito
        }));

        // Cargar distritos de la provincia seleccionada
        if (provincia && formData.departamento) {
            const dists = obtenerDistritosPorProvincia(formData.departamento, provincia);
            setDistritos(dists);
        } else {
            setDistritos([]);
        }
    };

    // Manejar cambio de distrito
    const handleDistritoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const distrito = event.target.value;
        setFormData(prevData => ({
            ...prevData,
            distrito: distrito
        }));
    };

    // Manejar envío del formulario
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{clienteToEdit ? 'Editar Cliente' : 'Nuevo Cliente'}</h2>
                    <button 
                        className="modal-close-button"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="cliente-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="domicilio_fiscal">
                                Domicilio Fiscal
                            </label>
                            <input
                                type="text"
                                id="domicilio_fiscal"
                                name="domicilio_fiscal"
                                value={formData.domicilio_fiscal}
                                onChange={handleInputChange}
                                placeholder="Av. Ejemplo 123"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="departamento">
                                Departamento
                            </label>
                            <select
                                id="departamento"
                                name="departamento"
                                value={formData.departamento}
                                onChange={handleDepartamentoChange}
                                disabled={isLoading}
                            >
                                <option value="">Seleccionar departamento...</option>
                                {departamentos.map((dep) => (
                                    <option key={dep} value={dep}>{dep}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="provincia">
                                Provincia
                            </label>
                            <select
                                id="provincia"
                                name="provincia"
                                value={formData.provincia}
                                onChange={handleProvinciaChange}
                                disabled={isLoading || !formData.departamento}
                            >
                                <option value="">
                                    {formData.departamento ? 'Seleccionar provincia...' : 'Primero seleccione departamento'}
                                </option>
                                {provincias.map((prov) => (
                                    <option key={prov} value={prov}>{prov}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="distrito">
                                Distrito
                            </label>
                            <select
                                id="distrito"
                                name="distrito"
                                value={formData.distrito}
                                onChange={handleDistritoChange}
                                disabled={isLoading || !formData.provincia}
                            >
                                <option value="">
                                    {formData.provincia ? 'Seleccionar distrito...' : 'Primero seleccione provincia'}
                                </option>
                                {distritos.map((dist) => (
                                    <option key={dist} value={dist}>{dist}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="pais">
                                País
                            </label>
                            <input
                                type="text"
                                id="pais"
                                name="pais"
                                value={formData.pais}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="fecha_inicio_actividades">
                                Fecha Inicio Actividades
                            </label>
                            <input
                                type="date"
                                id="fecha_inicio_actividades"
                                name="fecha_inicio_actividades"
                                value={formData.fecha_inicio_actividades}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="tipo_cliente">
                                Tipo de Cliente
                            </label>
                            <select
                                id="tipo_cliente"
                                name="tipo_cliente"
                                value={formData.tipo_cliente}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            >
                                <option value="Empresa">Empresa</option>
                                {/* <option value="Persona">Persona</option> */}
                            </select>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="button-secondary"
                            onClick={onCancel}
                            disabled={isLoading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="button-primary"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Guardando...' : clienteToEdit ? 'Actualizar' : 'Crear'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClienteForm;