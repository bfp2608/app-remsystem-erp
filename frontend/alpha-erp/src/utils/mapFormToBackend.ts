import { CompanyCustomer, PersonCustomer } from "../types/client";

export type FormState = Omit<Partial<CompanyCustomer> & Partial<PersonCustomer>, 'customerType'> & { customerType: 'COMPANY' | 'PERSON'}

export const mapFormToBackend = (formData: FormState) =>{

    if(formData.customerType === 'COMPANY'){
        return{
            tipo_entidad: 'Empresa',
            ruc: formData.taxId,
            razon_social: formData.businessName,
            nombre_comercial: formData.commercialName,
            correo_corporativo: formData.emailAddress,
            telefono: formData.phoneNumber,
            sitio_web: formData.websiteUrl,
            actividad_economica: formData.economicActivities,
            condicion_ruc: formData.taxCondition
        }
    }

    return {
        tipo_entidad: 'Persona',
        nombre_completos: formData.fullName,
        ruc: formData.taxId,
        correo_personal: formData.emailAddress,
        celular_personal: formData.phoneNumber,
        cargo: formData.jobTitle
    }
    
}