// 1. TYPES
export type CustomerFilterType = { 
    email: string; 
    type: string; 
    phone: string; 
    website: string; 
    economicActivity: string; 
    cargo: string; // ver si cambiarlo a jobTitle
}

export type CustomerColumnType = {
    email: boolean;
    phone: boolean;
    taxId: boolean;
    type: boolean;
    website: boolean;
    economicActivity: boolean;
    jobTitle: boolean;    
}

// 2. INITIAL STATES
export const emptyCustomerFilter: CustomerFilterType = { 
    email: "", 
    type: "", 
    phone: "", 
    website: "", 
    economicActivity: "", 
    cargo: "" 
}

export const initialCustomerColumns: CustomerColumnType = {
    email: true,
    phone: true,
    taxId: true,
    type: true,
    website: false,
    economicActivity: false,
    jobTitle: false   
}

// 3. CONSTANTS
export const CUSTOMER_ID_TYPE = {
    COMPANY: "E",
    PERSON: "P"
} as const

export const CUSTOMER_TYPE = {
    COMPANY: "Empresa",
    PERSON: "Persona"
} as const

export const CUSTOMER_FILTER_OPTIONS = {
    WITH_EMAIL: "Con correo",
    WITHOUT_EMAIL: "Sin correo",
    WITH_PHONE: "Con teléfono",
    WITHOUT_PHONE: "Sin teléfono",
    WITH_WEB: "Con sitio web",
    WITHOUT_WEB: "Sin sitio web"
} as const

// 4. EL PATRÓN ESTRATEGIA
// Definimos un diccionario donde la "llave" es el filtro, y el "valor" es la función que lo resuelve.
type FilterStrategy = (val?: string) => boolean;

const filterStrategies: Record<string, FilterStrategy> = {
    [CUSTOMER_TYPE.COMPANY]: (val) => val === CUSTOMER_TYPE.COMPANY,
    [CUSTOMER_TYPE.PERSON]: (val) => val === CUSTOMER_TYPE.PERSON,
    
    [CUSTOMER_FILTER_OPTIONS.WITH_EMAIL]: (val) => Boolean(val),
    [CUSTOMER_FILTER_OPTIONS.WITHOUT_EMAIL]: (val) => !val,
    
    [CUSTOMER_FILTER_OPTIONS.WITH_PHONE]: (val) => Boolean(val),
    [CUSTOMER_FILTER_OPTIONS.WITHOUT_PHONE]: (val) => !val,
    
    [CUSTOMER_FILTER_OPTIONS.WITH_WEB]: (val) => Boolean(val),
    [CUSTOMER_FILTER_OPTIONS.WITHOUT_WEB]: (val) => !val,
}

// 5. LA FUNCIÓN PRINCIPAL OPTIMIZADA
export function applyCustomerFilter(filterValue: string, value?: string): boolean {
    // Buscamos la estrategia en nuestro diccionario
    const strategy = filterStrategies[filterValue]
    
    // Si existe una estrategia para ese filtro, la ejecutamos. Si no, devolvemos true (default).
    return strategy ? strategy(value) : true
}