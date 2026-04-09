import { Cliente, esEmpresa, ClienteNormalizado } from '../types/client'
import { ID_TIPO_CLIENTE, TIPO_CLIENTE } from '../types/filtros/filtrosClientes'


export function normalizar(clientes: Cliente[]): ClienteNormalizado[] {
    return clientes.map(cliente => {
        if (esEmpresa(cliente)) {
            return {
                id: `${ID_TIPO_CLIENTE.ID_EMPRESA}${cliente.id_empresa}`,
                tipo: TIPO_CLIENTE.EMPRESA,
                ruc: cliente.ruc,
                nombre: cliente.razon_social,
                nombreComercial: cliente.nombre_comercial,
                telefono: cliente.telefono,
                correo: cliente.correo_corporativo,
                direccion: cliente.direccion,
                sucursal: cliente.sucursal,
                fechaInicioActividades: cliente.fecha_inicio_actividades,
                sitioWeb: cliente.sitio_web,
                condicion: cliente.condicion_ruc,
                pais: cliente.pais,
                departamento: cliente.departamento,
                provincia: cliente.provincia,
                idDistrito: cliente.id_distrito
            }
        } else {
            return {
                id: `${ID_TIPO_CLIENTE.ID_PERSONA}${cliente.id_persona}`,
                tipo: TIPO_CLIENTE.PERSONA,
                nombre: cliente.nombres_completos,
                cargo: cliente.cargo,
                correo: cliente.correo_personal,
                telefono: cliente.celular_personal,
                ruc: cliente.ruc,
                direccion: cliente.direccion,
                pais: cliente.pais,
                departamento: cliente.departamento,
                provincia: cliente.provincia,
                idDistrito: cliente.id_distrito
            }
        }
    })
}