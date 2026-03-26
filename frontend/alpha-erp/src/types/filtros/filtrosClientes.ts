export type TipoFiltrosCliente = { correo: string; tipo: string, telefono: string, sitioWeb:string, actividadEconomica: string, cargo: string }

export const filtroVacioCliente:TipoFiltrosCliente = {correo: "", tipo: "", telefono: "", sitioWeb: "",actividadEconomica: "", cargo: "" }

export const ID_TIPO_CLIENTE = {
    ID_EMPRESA: "E",
    ID_PERSONA: "P"
} as const

export const TIPO_CLIENTE = {
    EMPRESA: "Empresa",
    PERSONA: "Persona"
} as const

export const OPCIONES_FILTRO_CLIENTE = {
    CON_CORREO: "Con correo",
    SIN_CORREO: "Sin correo",
    CON_TELEFONO: "Con teléfono",
    SIN_TELEFONO: "Sin teléfono",
    CON_WEB: "Con sitio web",
    SIN_WEB: "Sin sitio web"
} as const


export function aplicarFiltroClientes(valorFiltro: string, valor?: string): boolean {

    const tieneValor = Boolean(valor)
    
    switch(valorFiltro) {
        case TIPO_CLIENTE.EMPRESA: return valor === TIPO_CLIENTE.EMPRESA
        case TIPO_CLIENTE.PERSONA: return valor === TIPO_CLIENTE.PERSONA
        case OPCIONES_FILTRO_CLIENTE.CON_CORREO: return tieneValor
        case OPCIONES_FILTRO_CLIENTE.SIN_CORREO: return !tieneValor
        case OPCIONES_FILTRO_CLIENTE.CON_TELEFONO: return tieneValor
        case OPCIONES_FILTRO_CLIENTE.SIN_TELEFONO: return !tieneValor
        case OPCIONES_FILTRO_CLIENTE.CON_WEB: return tieneValor
        case OPCIONES_FILTRO_CLIENTE.SIN_WEB: return !tieneValor
        default: return true
    }
}

export type TipoColumnasClientes = {
    correo: boolean
    telefono: boolean
    ruc: boolean
    tipo: boolean
    sitioWeb: boolean
    actividadEconomica: boolean
    cargo: boolean    
}

export const columnasInicioClientes:TipoColumnasClientes = {
    correo: true,
    telefono: true,
    ruc: true,
    tipo: true,
    sitioWeb: false,
    actividadEconomica: false,
    cargo: false   
}