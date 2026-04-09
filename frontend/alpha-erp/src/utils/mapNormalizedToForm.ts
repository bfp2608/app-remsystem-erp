import { ClienteNormalizado, Customer } from "../types/client";

export const mapNormalizedToForm = (client: ClienteNormalizado): Partial<Customer> =>{
    
    const isCompany = client.tipo === 'Empresa'

    return{
        id: client.id,
        customerType: isCompany ? 'COMPANY' : 'PERSON',
        taxId: client.ruc || '',

        businessName: isCompany ? client.nombre : '',
        commercialName: isCompany ? client.nombreComercial : '',
        fullName: !isCompany ? client.nombre : '',

        taxCondition: client.condicion || '',
        emailAddress: client.correo || '',
        phoneNumber: client.telefono || '',

        webSiteUrl: client.sitioWeb || '',
        economicActivities: client.actividadEconomica || '',
        jobTitle: client.cargo || '',

        streetAddress: client.direccion || '',
        country: client.pais || '',
        department: client.departamento || '',
        province: client.provincia || '',
        district: client.idDistrito || '',

        activityStartDate: client.fechaInicioActividades || '',
        branchName: isCompany ? client.sucursal : ''
    }

}