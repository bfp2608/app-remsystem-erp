import { create } from "zustand";
import { Cliente, esEmpresa } from "../types/client";
import { ID_TIPO_CLIENTE } from "../types/filtros/filtrosClientes";

interface ClientStore {
    clients: Cliente[]
    isLoading: boolean
    fetchClients: () => Promise<void>
    getClient:(id:string) => Cliente | undefined
}

export const useClientsStore = create<ClientStore>((set, get) => ({
    clients: [],
    isLoading: false,
    fetchClients: async () =>{
        set({isLoading: true})

        try{
            const response = await fetch("/mockClients.json")

            if(!response.ok){
                throw new Error(`HTTP error¡ status: ${response.status}`)
            }

            const data = await response.json()

            await new Promise(res => setTimeout(res, 500))

            set({clients: data, isLoading: false})
        } catch(error){
            console.error("Error cargando los clientes", error)
            set({isLoading:false})
        }
    },
    getClient: (id) =>{
        return get().clients.find(client =>{
            const clientId = esEmpresa(client)
            ? `${ID_TIPO_CLIENTE.ID_EMPRESA}${client.id_empresa}`
            : `${ID_TIPO_CLIENTE.ID_PERSONA}${client.id_persona}`

            return clientId === id
        })
    }
}))