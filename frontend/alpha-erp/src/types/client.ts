//Tipos para Clientes, aún por afinar


export type Empresa = {
    id_empresa : number;
    ruc : string;
    razon_social : string;
    condicion : string;

    //nulo o aún por REVISAR
    id_distrito? : number;
    direccion? : string;
    id_tipo_empresa? : number;
    nombre_comercial? : string;
    celular_corporativo? : string;
    correo_corporativo? : string;
    fecha_inicio_actividades?: string;
    actividad_economica? : string;
    sitio_web? : string;
    fecha_creacion? : string;
    fecha_actualizacion? : string;
}

export type Persona = {
    id_persona : number;
    id_empresa : number;
    nombres_completos : string;
    cargo : string;
    ruc: string

    //nulo o aún por REVISAR
    correo_personal? : string;
    celular_personal? : string;
    fecha_creacion? : string;
    fecha_actualizacion? : string;
}


//El tipo Cliente permite Empresa y Persona
//Para poner todo en un array y mostrarlos en la tabla
export type Cliente =  Empresa | Persona;


//
export type ClienteNormalizado = {
    id: string
    nombre: string
    nombreComercial?: string
    correo?: string
    telefono?: string
    tipo: 'Empresa' | 'Persona'
    ruc?: string
    sitioWeb?: string
    actividadEconomica?: string
    cargo?: string
    condicion?:string
}

//Para diferenciar entre Persona y Empresa
//cliente debe tener los campos que se le piden

//Si el return es cierto, el cliente es EMPRESA
export function esEmpresa(cliente: Cliente): cliente is Empresa {
    return 'razon_social' in cliente && 'ruc' in cliente;
}

//Si el return es cierto, el cliente es PERSONA
export function esPersona(cliente: Cliente): cliente is Persona {
    return 'id_persona' in cliente && 'nombres_completos' in cliente;
}



//------------------------------------
export interface BaseCustomer {
    id?: string
    customerType: 'COMPANY' | 'PERSON'
    emailAddress?: string
    phoneNumber?: string

    streetAddress?: string
    country?: string
    department?: string
    province?: string
    district?: string 
}

export interface CompanyCustomer extends BaseCustomer {
    customerType: 'COMPANY'
    commercialName: string
    businessName: string
    taxId: string //Esto es el RUC
    activityStartDate?: string
    websiteUrl?: string
    taxCondition?: string
    economicActivities?: string
    branchName?: string
}

export interface PersonCustomer extends BaseCustomer {
    customerType: 'PERSON'
    fullName: string
    jobTitle?: string
    nationalId?: string //Esto es el DNI en el caso de Perú
}

export type Customer = CompanyCustomer | PersonCustomer