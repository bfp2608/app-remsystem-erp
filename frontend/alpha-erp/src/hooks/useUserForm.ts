import { useNavigate } from "react-router-dom"
import { useUserStore } from "../store/userStore"
import { FormEvent, useEffect, useState } from "react"
import { RUTAS } from "../constans"
import { toast } from "sonner"
import { emailValidator, passwordValidator } from "../utils/validators"
import { useAuth } from "../auth/useAuth"

export const useUserForm = (userId?: string) =>{
    const navigate = useNavigate()

    const { users, fetchUsers, addUser, updateUser, getUser } = useUserStore()
    const { user: userAdmin } = useAuth()

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
        if(users.length === 0 && userAdmin?.id_organizacion){
            fetchUsers(userAdmin.id_organizacion)
        }
    },[users.length, fetchUsers, userAdmin?.id_organizacion])

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
                    telefono: user.telefono || '',
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

    const validateForm = () : string | null =>{
        const { nombre_usuario, email, contrasenia, id_tipo_usuario, confirmar_contrasenia } = formData

        const validations = [
            (!nombre_usuario || !email || !contrasenia || !id_tipo_usuario)
            ? "Por favor completa los campos obligatorios" : null,
            (contrasenia !== confirmar_contrasenia) ? "Las contraseñas no coinciden" : null,
            emailValidator(email),
            passwordValidator(contrasenia)
        ]

        return validations.find(error => error !== null) || null
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        setIsSubmitting(true)

        const validationError = validateForm()
        if(validationError){
            toast.error(validationError)
            setIsSubmitting(false)
            return
        }

        try{
            const { confirmar_contrasenia, ...restoDeDatos } = formData

            const payloadToApi = {
                ...restoDeDatos,
                id_tipo_usuario: Number(restoDeDatos.id_tipo_usuario),
                id_organizacion: userAdmin?.id_organizacion
            }

            if(userId){
                await updateUser(userId, payloadToApi)
                toast.success("Usuario actualizado correctamente")
            }else{
                await addUser(payloadToApi)
                toast.success("Usuario registrado correctamente")

                console.log("NUEVO USUARIO LISTO PARA ENVIAR", payloadToApi)
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