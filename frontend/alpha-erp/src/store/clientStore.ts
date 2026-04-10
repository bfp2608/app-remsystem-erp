import { create } from "zustand";
import { Cliente, esEmpresa } from "../types/client";
import { CUSTOMER_ID_TYPE } from "../types/filtros/filtrosClientes";

interface ClientStore {
    clients: Cliente[]
    isLoading: boolean
    fetchClients: () => Promise<void>
    getClient:(id:string) => Cliente | undefined
    addClient: (newClient: Cliente) => void
    updateClient: (id: string, updatedClient: Partial<Cliente>) => void
    deleteClient: (id: string) => void
}

export const useClientsStore = create<ClientStore>((set, get) => ({
    clients: [],
    isLoading: false,
    fetchClients: async () =>{
        set({isLoading: true})

        const localData = localStorage.getItem("clientesDB")
        if(localData){
            set({ clients: JSON.parse(localData), isLoading: false})
            return
        }

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
            ? `${CUSTOMER_ID_TYPE.COMPANY}${client.id_empresa}`
            : `${CUSTOMER_ID_TYPE.PERSON}${client.id_persona}`

            return clientId === id
        })
    },
    addClient: (newClient) =>{
        const currentClients = get().clients

        const updateClients = [newClient, ...currentClients]

        set({ clients: updateClients })

        localStorage.setItem("clientesDB", JSON.stringify(updateClients))
    },
    updateClient: (id, updatedClientData) =>{
        const currentClients = get().clients

        const updatedClients = currentClients.map(client =>{
            const clientId = esEmpresa(client)
            ? `${CUSTOMER_ID_TYPE.COMPANY}${client.id_empresa}`
            : `${CUSTOMER_ID_TYPE.PERSON}${client.id_persona}`

            if(clientId === id){
                return {...client, ...updatedClientData } as Cliente
            }
            return client
        })

        set({ clients: updatedClients })

        localStorage.setItem("clientesDB", JSON.stringify(updatedClients))
    },
    deleteClient: (id) =>{
        const currentClients = get().clients
        const updatedClients = currentClients.filter(client =>{
            const clientId = esEmpresa(client)
            ? `${CUSTOMER_ID_TYPE.COMPANY}${client.id_empresa}`
            : `${CUSTOMER_ID_TYPE.PERSON}${client.id_persona}`
            return clientId !== id
        })

        set({ clients: updatedClients })
        localStorage.setItem("clientesDB", JSON.stringify(updatedClients))
    }
}))