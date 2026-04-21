export type Usuario = {
    id_usuario : number;
    id_tipo_usuario : number;
    nombre_usuario : string;
    email : string;
    contrasenia : string;
    tipo_usuario?:{
        tipo: string
    }
    
    telefono? : string
    activo?: boolean
}