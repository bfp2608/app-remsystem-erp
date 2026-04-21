import { supabase } from "../config/supabaseClient";
import { Usuario } from "../types/usuario";

const TABLE_NAME = 'usuario'

export const userService = {
    fetchUsers: async (id_organizacion: number): Promise<Usuario[]> =>{
        const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*, tipo_usuario(tipo)')
        .eq('id_organizacion', id_organizacion)
        .order('id_usuario', { ascending: false })

        if(error) throw new Error(error.message)
        return data || []
    },

    createUser: async (userData: Omit<Usuario, 'id_usuario'>): Promise<Usuario> =>{
        const { data, error } = await supabase
        .from(TABLE_NAME)
        .insert([userData])
        .select('*, tipo_usuario(tipo)')
        //Para que devuelva un objeto y no un array
        .single()

        if(error) throw new Error(error.message)
        return data
    },

    updateUser: async(userId: string | number, updatedData: Partial<Usuario>): Promise<Usuario> =>{
        const { data, error } = await supabase
        .from(TABLE_NAME)
        .update(updatedData)
        .eq('id_usuario', userId)
        .select('*, tipo_usuario(tipo)')
        .single()

        if(error) throw new Error(error.message)
        return data
    },

    deleteUser: async(userId: string | number): Promise<void> =>{
        const { error } = await supabase
        .from(TABLE_NAME)
        .delete()
        .eq('id_usuario', userId)

        if(error) throw new Error(error.message)
    }
}