import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { emailValidator, passwordValidator } from "../utils/validators"
import { toast } from "sonner"
import { authService } from "../services/authService"
import { RUTAS } from "../constans"

export const useTenantForm = () =>{
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData, setFormData] = useState({
        ruc: '',
        razon_social: '',
        nombre_usuario: '',
        email: '',
        contrasenia: '',
        confirmar_contrasenia: ''
    })

    const handleInputChange = (field: keyof typeof formData, value: string) =>{
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const validateForm = (): string | null =>{
        const { ruc, razon_social, nombre_usuario, email, contrasenia, confirmar_contrasenia } = formData

        const rules = [
            (!ruc || !razon_social || !nombre_usuario || !email || !contrasenia) 
            ? "Todos los campos son obligatorios" : null,
            (ruc.length !== 11) ? "El RUC debe tener exactamente 11 dígitos" : null,
            (contrasenia !== confirmar_contrasenia) ? "Las contraseñas no coinciden" : null,
            emailValidator(email),
            passwordValidator(contrasenia)
        ]

        return rules.find(error => error !== null) || null
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
            await authService.registerTenant(formData)

            toast.success("Organización registrada con éxito")
            navigate(RUTAS.LOGIN)
        }catch(error){
            toast.error("Ocurrió un error durante el registro")
            console.error(error)
        }finally{
            setIsSubmitting(false)
        }
    }
    return { formData, isSubmitting, handleInputChange, handleSubmit}
}