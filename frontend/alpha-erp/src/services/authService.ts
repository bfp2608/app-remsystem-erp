import { supabase } from "../config/supabaseClient"
import { ROLE_TYPES } from "../constans"

export const authService = {
    registerTenant: async (formData: any) =>{
        const { data: orgData, error: orgError } = await supabase
        .from('organizacion')
        .insert([{
            ruc: formData.ruc,
            razon_social: formData.razon_social
        }])
        .select('id_organizacion')
        .single()

        if(orgError) throw new Error("Error creando la organización")

        const { error: userError } = await supabase
        .from('usuario')
        .insert([{
            nombre_usuario: formData.nombre_usuario,
            email: formData.email,
            contrasenia: formData.contrasenia,
            id_tipo_usuario: ROLE_TYPES.admin,
            activo: true,
            id_organizacion: orgData.id_organizacion
        }])

        if(userError){
            await supabase
            .from('organizacion')
            .delete()
            .eq('id_organizacion', orgData.id_organizacion)

            throw new Error("Error creando el usuario administrador")
        }
        return true
    }
}