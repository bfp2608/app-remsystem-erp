import { House, Users, FileText, PieChart, DollarSign} from "lucide-react"
import type { NavigationItem } from "./types/sidebar"

//Para los tipos de usuarios
export const ROLE_TYPES = {
    admin: 1,
    user: 2,
    manager: 3
}

//Diccionario de rutas - única fuente de la verdad
export const RUTAS = {
    LOGIN: '/',
    REGISTRO: '/registro',
    DASHBOARD: '/dashboard',
    CLIENTES: '/dashboard/clientes',
    USUARIOS: '/dashboard/usuario',

    NEW_CLIENTE: "/dashboard/clientes/formulario",
    EDIT_CLIENTE: '/dashboard/clientes/formulario/:id',

    NEW_USUARIO: '/dashboard/usuario/formulario',
    EDIT_USUARIO: '/dashboard/usuario/formulario/:id',
}

//Opciones del Sidebar del dashboard
export const NAVIGATION_DATA: NavigationItem[] = [
        //Array de datos
        //Cada objeto es una opcion dentro del sidebar
        {
            type: 'link',
            label: 'Dashboard',
            href: RUTAS.DASHBOARD,
            icon: <House />
        },

        {
            type: 'dropdown',
            label: 'Equipos',
            defaultOpen: false,
            icon: <Users />,
            subItems: [
                { label: 'Ingeniería', href: '#'},
                { label: 'Recursos Humanos', href: '#'},
                { label: 'Éxito del Cliente', href: '#'}
            ]
        },

        {
            type: 'dropdown',
            label: 'Contactos',
            defaultOpen: false,
            icon: <Users />,
            subItems: [
                { label: 'Clientes', href: RUTAS.CLIENTES},
                { label: 'Usuarios', href: RUTAS.USUARIOS},
            ]
        },

        {
            type: 'dropdown',
            label: 'Ventas',
            defaultOpen: false,
            icon: <DollarSign />,
            subItems: [
                { label: 'Estádisticas', href: '#'}
            ]
        },

        {
            type: 'link',
            label: 'Documentos',
            href: '#',
            icon: <FileText />
        },

        {
            type: 'link',
            label: 'Reportes',
            href: '#',
            icon: <PieChart />
        }
    ]

export const PAISES_DATA: string [] = [
        "Pais",
        "Perú",
        "Chile",
        "Argentina"
    ]