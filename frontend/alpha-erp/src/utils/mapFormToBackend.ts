import { CompanyCustomer, Empresa, Persona, PersonCustomer } from "../types/client";

export type FormState = Omit<Partial<CompanyCustomer> & Partial<PersonCustomer>, 'customerType'> & { customerType: 'COMPANY' | 'PERSON'}

//Retorna una Empresa o una Persona (sin el ID aún, porque eso lo genera la BD/Zustand)
export const mapFormToBackend = (formData: FormState): Omit<Empresa, 'id_empresa'> | Omit<Persona, 'id_persona'> =>{

    if(formData.customerType === 'COMPANY'){
        return{
            tipo_entidad: 'Empresa',
            ruc: formData.taxId || '',
            razon_social: formData.businessName || '',
            nombre_comercial: formData.commercialName || '',
            correo_corporativo: formData.emailAddress || '',
            telefono: formData.phoneNumber || '',
            sitio_web: formData.webSiteUrl || '',
            actividad_economica: formData.economicActivities || '',
            condicion_ruc: formData.taxCondition || '',
            sucursal: formData.branchName  || '',
            direccion: formData.streetAddress || '',
            pais: formData.country || '',
            departamento: formData.department || '',
            provincia: formData.province || '',
            id_distrito: formData.district || '',
            fecha_inicio_actividades: formData.activityStartDate || '',
        }
    }

    return {
        tipo_entidad: 'Persona',
        ruc: formData.taxId || '',
        nombres_completos: formData.fullName || '',
        correo_personal: formData.emailAddress || '',
        celular_personal: formData.phoneNumber || '',
        nombre_empresa: formData.companyName || '',
        cargo: formData.jobTitle || '',
        direccion: formData.streetAddress || '',
        pais: formData.country || '',
        departamento: formData.department || '',
        provincia: formData.province || '',
        id_distrito: formData.district || '',
        sitio_web: formData.webSiteUrl || '',
    }
    
}