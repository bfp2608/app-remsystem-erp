import { create } from "zustand"
import { supabase } from "../config/supabaseClient"

export interface Pais {
    id_pais: number
    nombre: string
    codigo_iso: string
}

export interface Departamento {
    id_departamento: number
    id_pais: number
    departamento: string
}

export interface Provincia {
    id_provincia: number
    id_departamento: number
    provincia: string
}

export interface Distrito {
    id_distrito: number
    id_provincia: number
    distrito: string
}

interface LocationStore {
    paises: Pais[]
    departamentos: Departamento[]
    provincias: Provincia[]
    distritos: Distrito[]
    isLoading: boolean
    fetchLocations: () => Promise<void> 
}

export const useLocationStore = create<LocationStore> ((set) =>({
    paises: [],
    departamentos: [],
    provincias: [],
    distritos: [],
    isLoading: false,

    fetchLocations: async () =>{
        set({ isLoading: true })
        try{
            const [paisesRes, deptosRes, provsRes, distritoRes] = await Promise.all([
                supabase.from('pais').select('*'),
                supabase.from('departamento').select('*').order('departamento'),
                supabase.from('provincia').select('*').order('provincia'),
                supabase.from('distrito').select('*').limit(2000).order('distrito')
            ])

            if(paisesRes.error) throw paisesRes.error
            if(deptosRes.error) throw deptosRes.error
            if(provsRes.error) throw provsRes.error
            if(distritoRes.error) throw distritoRes.error

            set({ 
                paises: paisesRes.data as Pais[],
                departamentos: deptosRes.data as Departamento[],
                provincias: provsRes.data as Provincia[],
                distritos: distritoRes.data as Distrito[],
                isLoading: false
            })
        }catch(error){
            console.error("Error cargando ubicaciones", error)
            set({ isLoading: false })
        }
            
    }
}))