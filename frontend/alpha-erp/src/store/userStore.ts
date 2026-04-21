import { create } from "zustand"
import { Usuario } from "../types/usuario"
import { userService } from "../services/userService"

interface UserStore {
    users: Usuario[]
    isLoading: boolean
    fetchUsers: (id_organizacion: number) => Promise<void>
    getUser: (id: string) => Usuario | undefined
    addUser: (newUser: Omit<Usuario, 'id_usuario'>) => Promise<void>
    updateUser: (id: string | number, updatedUser: Partial<Usuario>) => Promise<void>
    deleteUser: (id: string | number) => Promise<void>
    clearUsers: () => void
}

export const useUserStore = create<UserStore>((set, get) => ({
    users: [],
    isLoading: false,

    fetchUsers: async (id_organizacion) =>{
        set({ isLoading: true })
        try{
            const data = await userService.fetchUsers(id_organizacion)
            set({ users: data, isLoading: false})
        }catch(error){
            console.error("Fetch error: ", error)
            set({ isLoading: false })
        }
    },

    getUser: (id) =>{
        return get().users.find(user => user.id_usuario.toString() === id.toString())
    },

    addUser: async (newUser) =>{
        try{
            const createdUser = await userService.createUser(newUser)
            set({ users: [createdUser, ...get().users]})
        }catch(error){
            console.error("Add error: ", error)
            throw error
        }
    },

    updateUser: async (id, updatedUser) =>{
        try{
            const savedUser = await userService.updateUser(id, updatedUser)
            set({
                users: get().users.map(user =>
                    user.id_usuario.toString() === id.toString() ? savedUser : user
                )
            })
        }catch(error){
            console.error("Update error: ", error)
            throw error
        }
    },

    deleteUser: async (id) => {
        try{
            await userService.deleteUser(id)
            set({
                users: get().users.filter(user => user.id_usuario.toString() !== id.toString())
            })
        }catch(error){
            console.error("Delete error: ", error)
            throw error
        }
    },

    clearUsers: () =>{
        set({ users: [], isLoading: false})
    }

})) 