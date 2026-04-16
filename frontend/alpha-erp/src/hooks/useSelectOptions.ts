import { useEffect } from "react"
import { useCatalogCiiuStore } from "../store/catalogCiiuStore"
import { useClientsStore } from "../store/clientStore"
import { esEmpresa } from "../types/client"

export const useSelectOptions = () =>{
    const { clients } = useClientsStore()

    const { ciiuOptions, fetchCiiu } = useCatalogCiiuStore()

    useEffect(() =>{
        fetchCiiu()
    },[fetchCiiu])

    const companyOptions = clients
    .filter(esEmpresa)
    .map(empresa =>({
        value: empresa.id_empresa,
        label: `${empresa.ruc} - ${empresa.razon_social}`
    }))

    return{
        companyOptions,
        ciiuOptions
    }
}