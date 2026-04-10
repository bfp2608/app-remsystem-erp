import { create } from "zustand"
import { Usuario } from "../types/usuario"

interface UserStore {
    users: Usuario[]
    isLoading: boolean
    fetchUsers: () => Promise<void>
    getUser: (id: string) => Usuario | undefined
    addUser: (newUser: Usuario) => void
    updateUser: (id: string, updatedUser: Partial<Usuario>) => void
    deleteUser: (id: string) => void
}

export const useUserStore = create<UserStore>((set, get) => ({
    users: [],
    isLoading: false,

    fetchUsers: async () =>{
        set({ isLoading: true })
        try{
            const localUsers = localStorage.getItem("usersDB")
            if (localUsers){
                set({ users: JSON.parse(localUsers), isLoading: false})
                return
            }

            const response = await fetch("/mockUsers.json")
            if(!response.ok) throw new Error ("Error al conseguir usuarios")
            const data = await response.json()
            localStorage.setItem("usersDB", JSON.stringify(data))
            set({ users: data, isLoading: false})
        }catch (error){
            console.log(error)
            set({ isLoading: false})
        }
    },

    getUser: (id) =>{
        return get().users.find(user => user.id_usuario.toString() === id)
    },

    addUser: (newUser) =>{
        const currentUsers = get().users
        const updatedUsers = [newUser, ...currentUsers]
        set({ users: updatedUsers })
        localStorage.setItem("usersDB", JSON.stringify(updatedUsers))
    },

    updateUser: (id, updatedUser) =>{
        const currentUsers = get().users
        const updatedUsers = currentUsers.map(user => {
            if(user.id_usuario.toString() === id){
                return {...user, ...updatedUser } as Usuario
            }
            return user
        })
        set({ users: updatedUsers })
        localStorage.setItem("usersDB", JSON.stringify(updatedUsers))
    },

    deleteUser: (id) => {
        const currentUsers = get().users
        const updatedUsers = currentUsers.filter(user => user.id_usuario.toString() !== id)
        set({ users: updatedUsers })
        localStorage.setItem("usersDB", JSON.stringify(updatedUsers))
    }

})) 