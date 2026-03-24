import { create } from "zustand";
import { mockClientes } from "../utils/mockDataClientes";
import { esEmpresa } from "../types/client";

interface ClientsStore {
    clients: typeof mockClientes
    getClient: (id: string ) => typeof mockClientes[0] | undefined
}

export const useClientsStore = create<ClientsStore> ((set, get) => ({
    clients: mockClientes,

    getClient: (id) =>{
        return get().clients.find(client =>{
            const clientId = esEmpresa(client) ? `e${client.id_empresa}` : `p${client.id_persona}`
            return clientId === id
        })
    }
}))

