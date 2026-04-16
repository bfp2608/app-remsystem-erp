import { Cliente, esEmpresa, ClienteNormalizado } from '../types/client'
import { CUSTOMER_ID_TYPE, CUSTOMER_TYPE } from '../types/filtros/filtrosClientes'


export function normalizar(clientes: Cliente[]): ClienteNormalizado[] {
    return clientes.map(cliente => {
        if (esEmpresa(cliente)) {
            return {
                id: `${CUSTOMER_ID_TYPE.COMPANY}${cliente.id_empresa}`,
                tipo: CUSTOMER_TYPE.COMPANY,
                ruc: cliente.ruc,
                nombre: cliente.razon_social,
                nombreComercial: cliente.nombre_comercial,
                telefono: cliente.telefono,
                correo: cliente.correo_corporativo,
                direccion: cliente.direccion,
                sucursal: cliente.sucursal,
                fechaInicioActividades: cliente.fecha_inicio_actividades,
                actividadEconomica: cliente.actividad_economica,
                sitioWeb: cliente.sitio_web,
                condicion: cliente.condicion_ruc,
                pais: cliente.pais,
                departamento: cliente.departamento,
                provincia: cliente.provincia,
                idDistrito: cliente.id_distrito
            }
        } else {
            return {
                id: `${CUSTOMER_ID_TYPE.PERSON}${cliente.id_persona}`,
                tipo: CUSTOMER_TYPE.PERSON,
                nombre: cliente.nombres_completos,
                cargo: cliente.cargo,
                correo: cliente.correo_personal,
                telefono: cliente.celular_personal,
                ruc: cliente.documento_identidad,
                direccion: cliente.direccion,
                pais: cliente.pais,
                departamento: cliente.departamento,
                provincia: cliente.provincia,
                idDistrito: cliente.id_distrito,
                idEmpresa: cliente.id_empresa,
                actividadEconomica: cliente.actividad_economica
            }
        }
    })
}