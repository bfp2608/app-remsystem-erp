import { create } from "zustand"

export interface Pais {
    id_pais: number
    nombre: string
    codigo_iso: string
}

export interface Departamento {
    id_departamento: string
    id_pais: number
    departamento: string
}

export interface Provincia {
    id_provincia: string
    id_departamento: string
    provincia: string
}

export interface Distrito {
    id_distrito: string
    id_provincia: string
    distrito: string
}

interface LocationStore {
    paises: Pais[]
    departamentos: Departamento[]
    provincias: Provincia[]
    distritos: Distrito[]
    isLoading: boolean
    fetchLocations: () => Promise<void> 
}

export const useLocationStore = create<LocationStore> ((set) =>({
    paises: [{id_pais: 1, nombre: "Perú", codigo_iso:"PE"}],
    departamentos: [],
    provincias: [],
    distritos: [],
    isLoading: false,

    fetchLocations: async () =>{
        set({ isLoading: true })
        try{
            const response = await fetch('https://free.e-api.net.pe/ubigeos.json')
            if(!response.ok) throw new Error("Error al cargar ubicaciones")
            
            const rawData = await response.json()

            const tempDepartamentos: Departamento[] = []
            const tempPronvicas: Provincia[] = []
            const tempDistritos: Distrito[] = []

            //Se recorre el objeto principal (Departamentos)
            Object.entries(rawData).forEach(([nombreDepto, provinciasObj]: [string, any]) =>{
                const idDepto = nombreDepto

                tempDepartamentos.push({
                    id_departamento: idDepto,
                    id_pais: 1,
                    departamento: nombreDepto
                })

                Object.entries(provinciasObj).forEach(([nombreProvincia, distritosObj] : [string, any])=>{
                    const idProv = `${idDepto}-${nombreProvincia}`

                    tempPronvicas.push({
                        id_provincia: idProv,
                        id_departamento: idDepto,
                        provincia: nombreProvincia
                    })

                    Object.entries(distritosObj).forEach(([nombreDistrito, infoDistrito] : [string, any])=>{
                        tempDistritos.push({
                            id_distrito: infoDistrito.ubigeo,
                            id_provincia: idProv,
                            distrito: nombreDistrito
                        })
                    })
                })
            })

            //Filtro alfabético
            tempDepartamentos.sort((a, b) => a.departamento.localeCompare(b.departamento))
            tempPronvicas.sort((a, b) => a.provincia.localeCompare(b.provincia))
            tempDistritos.sort((a, b) => a.distrito.localeCompare(b.distrito))

            set({
                departamentos: tempDepartamentos,
                provincias: tempPronvicas,
                distritos: tempDistritos,
                isLoading: false
            })
        } catch(error){
            console.error("Error cargando API de ubigeos", error)
            set({ isLoading: false })
        }
    }
}))