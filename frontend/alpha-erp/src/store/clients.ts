import { create } from "zustand";
import { mockClientes } from "../utils/mockDataClientes";
import { esEmpresa } from "../types/client";
import { ID_TIPO_CLIENTE } from "../types/filtros/filtrosClientes";
import { Cliente } from "../types/client";

interface ClientsStore {
    clients: Cliente[]
    getClient: (id: string ) => Cliente[][0] | undefined
}

export const useClientsStore = create<ClientsStore> ((set, get) => ({
    clients: mockClientes,

    getClient: (id) =>{
        return get().clients.find(client =>{
            const clientId = esEmpresa(client) 
            ? `${ID_TIPO_CLIENTE.ID_EMPRESA + client.id_empresa}` 
            : `${ID_TIPO_CLIENTE.ID_PERSONA + client.id_persona}`
            return clientId === id
        })
    }
}))

