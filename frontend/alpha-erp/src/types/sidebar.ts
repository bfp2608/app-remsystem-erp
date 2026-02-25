import { ReactNode } from "react"

//Un type para cada caso (links simples y menus desplegables)
export type SubMenuItem = {
        label: string,
        href: string
}

export type NavigationItem = {
        type: 'link' | 'dropdown',
        label: string,
        icon: ReactNode
        href?: string,
        subItems?: SubMenuItem[],
        defaultOpen?: boolean
}