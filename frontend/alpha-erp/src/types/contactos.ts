//Tipos para Contactos, aún por afinar

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

    //nulo o aún por REVISAR
    correo_personal? : string;
    celular_personal? : string;
    fecha_creacion? : string;
    fecha_actualizacion? : string;
}


//El tipo Contacto permite Empresa y Persona
//Para poner todo en un array y mostrarlos en la tabla
export type Contacto =  Empresa | Persona;


//Para diferenciar entre Persona y Empresa
//contacto debe tener los campos que se le piden

//Si el return es cierto, el contacto es EMPRESA
export function esEmpresa(contacto: Contacto): contacto is Empresa {
    return 'razon_social' in contacto && 'ruc' in contacto;
}

//Si el return es cierto, el contacto es PERSONA
export function esPersona(contacto: Contacto): contacto is Persona {
    return 'id_persona' in contacto && 'nombres_completos' in contacto;
}