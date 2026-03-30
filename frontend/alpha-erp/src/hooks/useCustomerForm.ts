import { FormEvent, useEffect, useState } from "react"
import { useClientsStore } from "../store/clientStore"
import { FormState, mapFormToBackend } from "../utils/mapFormToBackend"
import { normalizar } from "../utils/normalizarClientes"
import { mapNormalizedToForm } from "../utils/mapNormalizedToForm"

export const useCustomerForm = (clientId?: string) =>{
    const { clients, fetchClients, getClient } = useClientsStore()

    const [formData, setFormData] = useState<FormState>({
        customerType: 'COMPANY',
        businessName: '',
        commercialName: '',
        fullName: '',
        taxId: '',
        emailAddress: '',
        phoneNumber: '',
        websiteUrl: '',
        taxCondition: '',
        economicActivities: ''
    })

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

    const handleSubmit = (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        if(formData.customerType === 'COMPANY'){
            if(!formData.businessName || !formData.taxId){
                alert("Por favor, ingresa la Razón social y el RUC")
                return
            }
        }else{
            if(!formData.fullName || !formData.taxId){
                alert("Por favor, ingrese el Nombre Completo y el DNI")
                return
            }
        }
        const payloadToAPI = mapFormToBackend(formData)

            console.log("=========================")
            console.log("ESTADO DEL FORMULARIO (Frontend):", formData)
            console.log("DATOS LISTOS PARA ENVIAR (Backend):", payloadToAPI)
            console.log("=========================")
    }
    return{
            formData,
            handleInputChange,
            handleSubmit
        }
}