import { supabase } from "../config/supabaseClient"
import { Cliente, Empresa, Persona } from "../types/client"

const saveActividadEconomica = async (ruc: string, actividadString?: string, isUpdate = false) =>{
        if(!actividadString) return
        
        const [codigo, descripcion] = actividadString.split('|')

        if(isUpdate){
            const { data: existente } = await supabase
            .from('act_economica')
            .select('id_actividad')
            .eq('ruc', ruc)
            .single()

            if(existente){
                const { error } = await supabase
                .from('act_economica')
                .update({ codigo, descripcion})
                .eq('ruc', ruc)

                if(error) console.error("Error actualizando actividad", error)
                return
            }
        }
        
        const { error } = await supabase
        .from('act_economica')
        .insert([{
            ruc, codigo, descripcion
        }])

        if(error) console.error("Error insertando actividad", error)
}

const saveSucursal = async (ruc: string, nombreSucursal?: string, idDistrito?:number | null, direccion?: string, isUpdate = false) =>{
    if(!nombreSucursal){
        if(isUpdate) await supabase.from('sucursal').delete().eq('ruc', ruc)
        return
    }

    const payload = {
        nombre_sucursal: nombreSucursal,
        id_distrito: idDistrito,
        direccion: direccion
    }
    
    if(isUpdate){
        const { data: existente } = await supabase
        .from('sucursal')
        .select('id_sucursal')
        .eq('ruc', ruc)
        .single()

        if(existente){
            const { error } = await supabase
            .from('sucursal')
            .update(payload)
            .eq('ruc', ruc)

            if(error) console.error("Error actualizando sucursal", error)
            return
        }
    }

    // Si no es update, o si era update pero no tenía sucursal antes: insertamos
    const { error } = await supabase
    .from('sucursal')
    .insert([{ruc, ...payload}])

    if(error) console.error("Eror insertando sucursal")
}

export const clientService = {
    fetchClients: async (id_organizacion: number): Promise<Cliente[]> =>{
        const [empresasRes, personasRes] = await Promise.all([
            supabase.from('empresa').select(`
                *,
                act_economica (codigo, descripcion),
                sucursal (nombre_sucursal)
            `)
            .eq('id_organizacion', id_organizacion),
            supabase.from('persona').select('*').eq('id_organizacion', id_organizacion)
        ])

        if(empresasRes.error) throw new Error(empresasRes.error.message)
        if(personasRes.error) throw new Error(personasRes.error.message)

        const dataEmpresas = (empresasRes.data || []).map(e => {
          const actividadData = e.act_economica?.[0] as any
          const sucursalData = e.sucursal?.[0] as any

          return{
            ...e,
            actividad_economica: actividadData ? `${actividadData.codigo}|${actividadData.descripcion}` : undefined,
            sucursal: sucursalData ? sucursalData.nombre_sucursal : undefined,
            tipo_entidad: "Empresa"
          }
        }) as Empresa[]


        const dataPersonas = (personasRes.data || []).map(p => ({...p, tipo_entidad: 'Persona'})) as Persona[]

        return [...dataEmpresas, ...dataPersonas]
    },

    createClient: async (newClient: Partial<Cliente>): Promise<Cliente> =>{
        if('razon_social' in newClient){
            const {actividad_economica, sucursal,  ...datosPuros } = newClient
            const { data, error } = await supabase
            .from('empresa')
            .insert([datosPuros])
            .select()
            .single()
            if(error) throw new Error(error.message)

            await Promise.all([
                saveActividadEconomica(data.ruc, actividad_economica, false),
                saveSucursal(data.ruc, sucursal, datosPuros.id_distrito, datosPuros.direccion, false)
            ]) 
            return {...data, actividad_economica, sucursal, tipo_entidad: "Empresa"} as Empresa
        }else{
            const { data, error } = await supabase
            .from('persona')
            .insert([newClient])
            .select()
            .single()

            if(error) throw new Error(error.message)
            return{...data, tipo_entidad: "Persona"} as Persona
        }
    },

    updateClient: async (numeridId: number, isCompany: boolean, updatedData: Partial<Cliente>): Promise<Cliente> =>{
        if(isCompany){
            const { actividad_economica, sucursal, ...datosPuros } = updatedData as Partial<Empresa>

            const { data, error } = await supabase
            .from('empresa')
            .update(datosPuros)
            .eq('id_empresa', numeridId)
            .select()
            .single()

            if(error) throw new Error(error.message)

            await Promise.all([
                saveActividadEconomica(data.ruc, actividad_economica, true),
                saveSucursal(data.ruc, sucursal, datosPuros.id_distrito, data.direccion, true)
            ]) 
            return{ ...data, actividad_economica, sucursal, tipo_entidad: "Empresa" } as Empresa
        }else{
            const { data, error } = await supabase
            .from('persona')
            .update(updatedData)
            .eq('id_persona', numeridId)
            .select()
            .single()

            if(error) throw new Error(error.message)
            return{ ...data, tipo_entidad: "Persona" } as Persona
        }
    },
    
    deleteClient: async(numericId: number, isCompany: boolean): Promise<void> =>{
        const tableName = isCompany ? 'empresa' : 'persona'
        const idField = isCompany ? 'id_empresa' : 'id_persona'

        const { error } = await supabase
        .from(tableName)
        .delete()
        .eq(idField, numericId)

        if(error) throw new Error(error.message)
    }
}