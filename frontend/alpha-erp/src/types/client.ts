//Tipos para Clientes, aún por afinar


export type Empresa = {
    id_empresa: number;
    tipo_entidad: 'Empresa';
    ruc: string;
    razon_social: string;
    nombre_comercial?: string;
    correo_corporativo?: string;
    telefono: string;
    sucursal?: string;
    direccion: string;
    pais: string;
    departamento: string;
    provincia: string;
    id_distrito: string;
    fecha_inicio_actividades: string;
    sitio_web?: string;
    actividad_economica: string;
    condicion_ruc: string;
}

export type Persona = {
    id_persona: number;
    tipo_entidad: 'Persona';
    ruc: string;
    nombres_completos: string;

    //Relación opcional con empresa
    id_empresa?: number;
    nombre_empresa?: string
    cargo?: string;

    correo_personal: string;
    celular_personal: string;
    direccion?: string;
    pais: string;
    departamento: string;
    provincia: string;
    id_distrito: string;
    //fecha_inicio_actividades?: string;
    sitio_web?: string;
    etiqueta?: string
    //actividad_economica: string;
}


//El tipo Cliente permite Empresa y Persona
//Para poner todo en un array y mostrarlos en la tabla
export type Cliente =  Empresa | Persona;


//
export type ClienteNormalizado = {
    id: string;
    nombre: string;
    nombreComercial?: string;
    correo?: string;
    telefono?: string;
    tipo: 'Empresa' | 'Persona';
    ruc: string;
    direccion?: string
    sucursal?: string
    pais?: string
    departamento?: string;
    provincia?: string;
    idDistrito?: string;
    sitioWeb?: string;
    fechaInicioActividades?: string
    actividadEconomica?: string;
    cargo?: string;
    condicion?: string;
}

//Para diferenciar entre Persona y Empresa
//cliente debe tener los campos que se le piden

//Si el return es cierto, el cliente es EMPRESA
export function esEmpresa(cliente: Cliente): cliente is Empresa {
    return cliente.tipo_entidad === "Empresa"
}

//Si el return es cierto, el cliente es PERSONA
export function esPersona(cliente: Cliente): cliente is Persona {
    return cliente.tipo_entidad === "Persona"
}



//------------------------------------
export interface BaseCustomer {
    id?: string
    customerType: 'COMPANY' | 'PERSON'

    taxId: string
    emailAddress?: string
    phoneNumber?: string
    webSiteUrl?: string

    streetAddress?: string
    country?: string
    department?: string
    province?: string
    district?: string 
}

export interface CompanyCustomer extends BaseCustomer {
    customerType: 'COMPANY'
    businessName: string
    commercialName: string

    activityStartDate?: string
    taxCondition?: string
    economicActivities?: string
    branchName?: string
}

export interface PersonCustomer extends BaseCustomer {
    customerType: 'PERSON'
    fullName: string

    companyId?: number
    companyName?: string

    jobTitle?: string
    nationalId?: string //Esto es el DNI en el caso de Perú
    tag: string //etiquetas
}

export type Customer = CompanyCustomer | PersonCustomer