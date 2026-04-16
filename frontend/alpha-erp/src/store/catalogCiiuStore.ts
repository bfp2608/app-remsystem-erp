import { create } from "zustand"
import { supabase } from "../config/supabaseClient"

interface CiiuOption {
    value: string
    label: string
}

interface CatalogStore {
    ciiuOptions: CiiuOption[]
    isLoading: boolean
    fetchCiiu: () => Promise<void>
}

export const useCatalogCiiuStore = create<CatalogStore>((set, get) =>({
    ciiuOptions: [],
    isLoading: false,

    fetchCiiu: async () =>{
        if(get().ciiuOptions.length > 0) return

        set({ isLoading: true})

        try{
            const { data, error } = await supabase
            .from('catalogo_ciiu')
            .select('*')
            .order('codigo')

            if(error) throw error

            const formatedOptions = data.map(item =>({
                value: item.codigo,
                label: `${item.codigo} - ${item.descripcion}`
            }))

            set({
                ciiuOptions: formatedOptions,
                isLoading: false
            })
        }catch(error){
            console.error("Error cargando el catálogo CIIU", error)
            set({ isLoading: false })
        }
    }
}))