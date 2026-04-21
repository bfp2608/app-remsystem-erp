
export type TipoFiltrosUsuario = { cargo: string; telefono: string }

export const filtroVacioUsuario:TipoFiltrosUsuario = {cargo: "", telefono: "" }

export const TIPO_USUARIO = {
    ADMIN: "Administrador",
    USUARIO: "Usuario"
} as const

export const OPCIONES_FILTRO_USUARIO = {
    CON_TELEFONO: "Con teléfono",
    SIN_TELEFONO: "Sin teléfono",
} as const


export function aplicarFiltroUsuario(valorFiltro: string, valor?: string): boolean {

    const tieneValor = Boolean(valor)
    
    switch(valorFiltro) {
        case TIPO_USUARIO.ADMIN: return valor === TIPO_USUARIO.ADMIN
        case TIPO_USUARIO.USUARIO: return valor === TIPO_USUARIO.USUARIO
        case OPCIONES_FILTRO_USUARIO.CON_TELEFONO: return tieneValor
        case OPCIONES_FILTRO_USUARIO.SIN_TELEFONO: return !tieneValor
        default: return true
    }
}


export type TipoColumnasUsuario = {
    correo: boolean
    telefono: boolean
    cargo: boolean
}

export const columnasInicioUsuarios:TipoColumnasUsuario = {
    correo: true,
    telefono: true,
    cargo: true
}