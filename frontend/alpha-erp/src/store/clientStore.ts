import { create } from "zustand";
import { Cliente, esEmpresa} from "../types/client";
import { CUSTOMER_ID_TYPE } from "../types/filtros/filtrosClientes";
import { clientService } from "../services/clientService";

interface ClientStore {
    clients: Cliente[]
    isLoading: boolean
    fetchClients: (id_organizacion: number) => Promise<void>
    getClient:(id:string) => Cliente | undefined
    addClient: (newClient: Omit<Cliente, 'id_empresa' | 'id_persona'>) => Promise<void>
    updateClient: (id: string, updatedClient: Partial<Cliente>) => Promise<void>
    deleteClient: (id: string) => Promise<void>
    clearClients: () => void
}

const getClientID = (client: Cliente) =>{
    return esEmpresa(client)
        ? `${CUSTOMER_ID_TYPE.COMPANY}${client.id_empresa}`
        : `${CUSTOMER_ID_TYPE.PERSON}${client.id_persona}`
}

export const useClientsStore = create<ClientStore>((set, get) => ({
    clients: [],
    isLoading: false,
    fetchClients: async (id_organizacion) =>{
        set({isLoading: true})

        try{
            const allClients = await clientService.fetchClients(id_organizacion)
            set({ clients: allClients, isLoading: false})

        } catch(error){
            console.error("Error cargando los clientes", error)
            set({isLoading:false})
        }
    },
    getClient: (id) =>{
        return get().clients.find(client => getClientID(client) === id)
    },

    addClient: async (newClient) =>{
        try{
            const addedClient = await clientService.createClient(newClient)
            set({ clients: [addedClient, ...get().clients]})
        }catch(error){
            console.log("Error agregando al cliente", error)
            throw error
        }
    },
    updateClient: async (id, updatedClientData) =>{
        try{
            const isCompany = 'razon_social' in updatedClientData
            const numericId = Number(id.replace(isCompany ? CUSTOMER_ID_TYPE.COMPANY : CUSTOMER_ID_TYPE.PERSON, ''))

            const updatedClient = await clientService.updateClient(numericId, isCompany, updatedClientData)

            const updatedClients = get().clients.map(client =>
                getClientID(client) === id ? updatedClient : client
            )

            set({ clients: updatedClients })
            
        }catch(error){
            console.error('Error actualizando el cliente', error)
            throw error
        }
    
    },
    deleteClient: async (id) =>{
        try{
            const isCompany = id.startsWith(CUSTOMER_ID_TYPE.COMPANY)
            const numericId = Number(id.replace(isCompany ? CUSTOMER_ID_TYPE.COMPANY : CUSTOMER_ID_TYPE.PERSON, ''))

            await clientService.deleteClient(numericId, isCompany)

            const updateClients = get().clients.filter(client => getClientID(client) !== id)

            set({ clients: updateClients})
        }catch(error){
            console.log("Error eliminando al cliente", error)
        }
    },

    clearClients: () =>{
        set({ clients: [], isLoading: false})
    }
}))