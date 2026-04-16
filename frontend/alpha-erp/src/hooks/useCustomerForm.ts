import { FormEvent, useEffect, useState } from "react"
import { useClientsStore } from "../store/clientStore"
import { FormState, mapFormToBackend } from "../utils/mapFormToBackend"
import { normalizar } from "../utils/normalizarClientes"
import { mapNormalizedToForm } from "../utils/mapNormalizedToForm"
import { useNavigate } from "react-router-dom"
import { RUTAS } from "../constans"
import { toast } from "sonner"
import { Cliente } from "../types/client"
import { emailValidator, requiredValidator } from "../utils/validators"
import { useLocationStore } from "../store/locationStore"
import { useAuth } from "../auth/useAuth"

export const useCustomerForm = (clientId?: string) =>{

    const navigate = useNavigate() 
    const { user: currentAdmin } = useAuth()
    const { clients, fetchClients, getClient, addClient, updateClient } = useClientsStore()
    const { distritos, provincias, departamentos, fetchLocations} = useLocationStore()

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
        if(clients.length === 0 && currentAdmin?.id_organizacion) fetchClients(currentAdmin.id_organizacion)
        if(distritos.length === 0) fetchLocations()
        
    },[clients.length, distritos.length, fetchClients, fetchLocations, currentAdmin?.id_organizacion])

    useEffect(()=>{

        const fillFormWithClientData = async () =>{
            if(clientId && clients.length > 0 && distritos.length > 0){
                const rawClients = getClient(clientId)
    
                if(rawClients){
                    const normalizedArray = normalizar([rawClients])
                    const normalizedClient = normalizedArray[0]
    
                    const englishFormData = mapNormalizedToForm(normalizedClient)

                    if(englishFormData.district){

                        const distId = Number(englishFormData.district)

                        const districtObj = distritos.find(d => d.id_distrito === distId)

                        if(districtObj){
                            const provObj = provincias.find(p => p.id_provincia === districtObj.id_provincia)

                            const deptoObj = provObj
                                ? departamentos.find(d => d.id_departamento === provObj.id_departamento)
                                : null
                            
                            if(provObj && deptoObj){
                                englishFormData.province = String(provObj.id_provincia)
                                englishFormData.department = String(deptoObj.id_departamento)
                                englishFormData.country = String(deptoObj.id_pais)
                            }
                        }
                    }
    
                    setFormData(prev =>({
                        ... prev,
                        ... englishFormData
                    }))
                }
            }
        }

        fillFormWithClientData()

    },[clientId, clients, distritos, provincias, departamentos, getClient])

    const handleInputChange = <K extends keyof FormState>(field: K, value: FormState[K]) =>{
        setFormData((prevData) =>({
            ...prevData,
            [field] : value
        }))
    }

    const validateForm = (): string | null =>{
        const isCompany = formData.customerType === "COMPANY"

        const specificErrors = isCompany ? [
            requiredValidator(formData.businessName, 'Razon Social'),
            requiredValidator(formData.taxId, 'RUC'),
            requiredValidator(formData.activityStartDate, 'F. de Inicio de Actividad')
        ] : [
            requiredValidator(formData.fullName, "Nombre y Apellido"),
            requiredValidator(formData.taxId, 'RUC')
        ]

        const commonErrors = [
            formData.emailAddress ? emailValidator(formData.emailAddress) : null,
            requiredValidator(formData.streetAddress, 'Dirección'),
            requiredValidator(formData.district, 'Distrito'),
            (formData.phoneNumber && formData.phoneNumber.length < 9) 
            ? "El teléfono debe tener al menos 9 dígitos" : null 
        ]

        const allErrors = [...specificErrors, ...commonErrors]

        return allErrors.find(error => error !== null) || null
    }

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        setIsSubmitting(true)

        const validationError = validateForm()
        if(validationError) {
            toast.error(validationError)
            setIsSubmitting(false)
            return
        }
        
        try{
            await new Promise(resolve => setTimeout(resolve, 500))

            const datosMapeados = mapFormToBackend(formData)

            const payloadToAPI = {
                ...datosMapeados,
                id_organizacion: currentAdmin?.id_organizacion
            }

            if(clientId){
                await updateClient(clientId, payloadToAPI as Partial<Cliente>)
                toast.success('Cliente actualizado correctamente')
            }else{
                await addClient(payloadToAPI as Omit<Cliente, 'id_empresa' | "id_persona">)
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