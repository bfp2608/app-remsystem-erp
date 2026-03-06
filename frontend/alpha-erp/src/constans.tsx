import { House, Users,  CalendarDays, FileText, PieChart, DollarSign } from "lucide-react"
import type { NavigationItem } from "./types/sidebar"

//Para los tipos de usuarios
export const ROLE_TYPES = {
    admin: 'admin',
    user: 'user',
    manager: 'manager'
}

//Diccionario de rutas - única fuente de la verdad
export const RUTAS = {
    DASHBOARD: '/dashboard',
    CLIENTES: '/dashboard/clientes',
    USUARIOS: '/dashboard/usuario',
    EDIT_CLIENTE: '/dashboard/clientes/edit',
    EDIT_USUARIO: '/dashboard/usuario/edit',
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
                { label: 'Editar clientes', href: RUTAS.EDIT_CLIENTE},
                { label: 'Editar usuarios', href: RUTAS.EDIT_USUARIO}
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
            label: 'Calendario',
            href: '#',
            icon: <CalendarDays />
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