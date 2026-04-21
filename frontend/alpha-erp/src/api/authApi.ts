import { toast } from "sonner"
import { supabase } from "../config/supabaseClient"

export type loginResponse = {
    token: string
    message: string
    success: boolean
    status: number
}

export type loginRequest = {
    email: string
    password: string
}

export type meResponse = {
    id_usuario: number
    id_organizacion: number
    organizacion_nombre: string
    nombres: string
    email: string
    tipoUsuario: number
    fechaRegistro: string
    activo: boolean
}

export const signIn = async (request: loginRequest): Promise<loginResponse> =>{
    const { data: userData, error} = await supabase
    .from('usuario')
    .select('*')
    .eq('email', request.email)
    .eq('contrasenia', request.password)
    .single()

    if(userData.activo === false){
        toast.error("Cuenta desactivada. Contacta al administrador.")
        throw new Error("Cuenta desactivada. Contacta al administrador.")
    }
    
    if(error || !userData) throw new Error('Credenciales incorrectas')
    
    return{
        token: userData.id_usuario.toString(), //Luego se le tiene que poner un mejor token
        message: "Login exitoso",
        success: true,
        status: 200
    }
}

export const router = async (token: string): Promise<meResponse> => {
    const { data: userData, error} = await supabase
    .from('usuario')
    .select(`
        *,
        organizacion(razon_social)
    `)
    .eq('id_usuario', Number(token))
    .single()

    if(error || !userData) throw new Error('Sesión inválida o expirada')

    if(userData.activo === false){
        toast.error("Tu cuenta ha sido desactivada por un administrador.")
        throw new Error("Tu cuenta ha sido desactivada por un administrador.")
    }
    
    return{
        id_usuario: userData.id_usuario,
        id_organizacion: userData.id_organizacion,
        organizacion_nombre: userData.organizacion?.razon_social || "EMPRESA SIN NOMBRE",
        nombres: userData.nombre_usuario,
        email: userData.email,
        tipoUsuario: userData.id_tipo_usuario,
        fechaRegistro: userData.fecha_registro,
        activo: userData.activo
    }
}