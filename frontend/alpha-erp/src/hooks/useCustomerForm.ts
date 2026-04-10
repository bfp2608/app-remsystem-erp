import { FormEvent, useEffect, useState } from "react"
import { useClientsStore } from "../store/clientStore"
import { FormState, mapFormToBackend } from "../utils/mapFormToBackend"
import { normalizar } from "../utils/normalizarClientes"
import { mapNormalizedToForm } from "../utils/mapNormalizedToForm"
import { useNavigate } from "react-router-dom"
import { RUTAS } from "../constans"
import { toast } from "sonner"
import { Cliente } from "../types/client"

export const useCustomerForm = (clientId?: string) =>{

    const navigate = useNavigate() 

    const { clients, fetchClients, getClient, addClient, updateClient } = useClientsStore()

    const [formData, setFormData] = useState<FormState>({
        customerType: 'COMPANY',
        businessName: '',
        commercialName: '',
        fullName: '',
        taxId: '',
        emailAddress: '',
        phoneNumber: '',
        webSiteUrl: '',
        taxCondition: '',
        economicActivities: '',
        streetAddress: '',
        country: '',
        department: '',
        province: '',
        district: '',
        branchName: '',
        activityStartDate: '',
        jobTitle: '',
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() =>{
        if(clients.length === 0){
            fetchClients()
        }
    },[clients.length, fetchClients])

    useEffect(()=>{

        const fillFormWithClientData = async () =>{
            if(clientId && clients.length > 0){
                const rawClients = getClient(clientId)
    
                if(rawClients){
                    const normalizedArray = normalizar([rawClients])
                    const normalizedClient = normalizedArray[0]
    
                    const englishFormData = mapNormalizedToForm(normalizedClient)
    
                    setFormData(prev =>({
                        ... prev,
                        ... englishFormData
                    }))
                }
            }
        }

        fillFormWithClientData()

    },[clientId, clients, getClient])

    const handleInputChange = <K extends keyof FormState>(field: K, value: FormState[K]) =>{
        setFormData((prevData) =>({
            ...prevData,
            [field] : value
        }))
    }

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        setIsSubmitting(true)

        if(formData.customerType === 'COMPANY'){
            if(!formData.businessName || !formData.taxId){
                toast.error("Por favor, ingresa la Razón social y el RUC")
                setIsSubmitting(false)
                return
            }
        }else{
            if(!formData.fullName || !formData.taxId){
                toast.error("Por favor, ingrese el Nombre Completo y el DNI")
                setIsSubmitting(false)
                return
            }
        }

        try{
            await new Promise(resolve => setTimeout(resolve, 800))

            const payloadToAPI = mapFormToBackend(formData)

            if(clientId){
                updateClient(clientId, payloadToAPI as Partial<Cliente>)
                toast.success('Cliente actualizado correctamente')
            }else{
                const fakeId = Math.floor(Math.random() * 100000)

                const newClient = {
                    ...payloadToAPI,
                    ...(formData.customerType === 'COMPANY' ? { id_empresa : fakeId } : { id_persona: fakeId})
                }

                addClient(newClient as Cliente)
                toast.success('Cliente registrado correctamente')
            }

            navigate(RUTAS.CLIENTES)

                console.log("=========================")
                console.log("ESTADO DEL FORMULARIO (Frontend):", formData)
                console.log("DATOS LISTOS PARA ENVIAR (Backend):", payloadToAPI)
                console.log("=========================")
        }catch(error){
            toast.error("Ocurrió un error al guardar")
            console.log(error)
        }finally{
            setIsSubmitting(false)
        }

    }
    return{
            formData,
            isSubmitting,
            handleInputChange,
            handleSubmit
        }
}