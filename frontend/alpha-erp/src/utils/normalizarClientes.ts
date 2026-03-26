import { Cliente, esEmpresa, ClienteNormalizado } from '../types/client'
import { ID_TIPO_CLIENTE, TIPO_CLIENTE } from '../types/filtros/filtrosClientes'


export function normalizar(clientes: Cliente[]): ClienteNormalizado[] {
    return clientes.map(cliente => {
        if (esEmpresa(cliente)) {
            return {
                id: ID_TIPO_CLIENTE.ID_EMPRESA + cliente.id_empresa,
                nombre: cliente.razon_social,
                correo: cliente.correo_corporativo,
                telefono: cliente.celular_corporativo,
                tipo: TIPO_CLIENTE.EMPRESA,
                ruc: cliente.ruc,
                sitioWeb: cliente.sitio_web,
                actividadEconomica: cliente.actividad_economica,
            }
        } else {
            return {
                id: ID_TIPO_CLIENTE.ID_PERSONA + cliente.id_persona,
                nombre: cliente.nombres_completos,
                correo: cliente.correo_personal,
                telefono: cliente.celular_personal,
                tipo: TIPO_CLIENTE.PERSONA,
                cargo: cliente.cargo,
            }
        }
    })
}