import { useNavigate } from "react-router-dom"
import { useUserStore } from "../store/userStore"
import { FormEvent, useEffect, useState } from "react"
import { RUTAS } from "../constans"
import { toast } from "sonner"

export const useUserForm = (userId?: string) =>{
    const navigate = useNavigate()

    const { users, fetchUsers, addUser, updateUser, getUser } = useUserStore()

    const [formData, setFormData] = useState({
        id_tipo_usuario: '' as string | number,
        nombre_usuario: '',
        email: '',
        contrasenia: '',
        confirmar_contrasenia:'',
        telefono: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() =>{
        if(users.length === 0){
            fetchUsers()
        }
    },[users.length, fetchUsers])

    useEffect(() =>{
        if(userId && users.length > 0){
            const user = getUser(userId)

            if(user){
                setFormData({
                    id_tipo_usuario: user.id_tipo_usuario,
                    nombre_usuario: user.nombre_usuario,
                    email: user.email,
                    contrasenia: user.contrasenia,
                    confirmar_contrasenia:user.contrasenia,
                    telefono: user.telefono || ''
                })
            }
        }
    }, [userId, users, getUser])

    const handleInputChange = (field: string, value: string | number) =>{
        setFormData(prev => ({ 
            ...prev,
            [field]: value
        }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        setIsSubmitting(true)

        if(!formData.nombre_usuario || !formData.email || !formData.contrasenia || !formData.id_tipo_usuario){
            toast.error("Por favor, completa los campos obligatorios")
            setIsSubmitting(false)
            return
        }

        if(formData.contrasenia !== formData.confirmar_contrasenia){
            toast.error("Las contraseñas no coinciden")
            setIsSubmitting(false)
            return
        }

        try{
            await new Promise(resolve => setTimeout(resolve, 800))

            const { confirmar_contrasenia, ...restoDeDatos } = formData

            const payloadToApi = {
                ...restoDeDatos,
                id_tipo_usuario: Number(restoDeDatos.id_tipo_usuario)
            }

            if(userId){
                updateUser(userId, payloadToApi)
                toast.success("Usuario actualizado correctamente")
            }else{
                const fakeId = Math.floor(Math.random() * 1000)
                const newUser = {
                    ...payloadToApi,
                    id_usuario: fakeId
                }
                addUser(newUser)
                toast.success("Usuario registrado correctamente")

                console.log("NUEVO USUARIO LISTO PARA ENVIAR", newUser)
            }

            navigate(RUTAS.USUARIOS)
        }catch(error){
            toast.error("Ocurrió un error al guardar")
            console.log(error)
        }finally{
            setIsSubmitting(false)
        }
    }
    return {formData, isSubmitting, handleInputChange, handleSubmit}
}