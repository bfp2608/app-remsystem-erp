import { FC, ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"

interface NavItemProps {
    icon: ReactNode,
    label: string,
    href?: string,
    isCollapsed?: boolean
}

export const NavItem: FC<NavItemProps> = ({ icon, label, href='#', isCollapsed}) =>{

    const location = useLocation()
    const isActive = location.pathname === href

    return(
        <Link 
        to={ href }
        title={ isCollapsed ? label : '' }
        className={`flex items-center py-2.5 rounded-md group transition-colors overflow-hidden ${isActive ? 'bg-gray-800 font-semibold' : 'hover:bg-gray-800'}`}
        >
            <div className={`w-10 flex justify-center shrink-0 transition-colors text-white`}>
                { icon }
            </div>

            <span className={`text-sm font-medium whitespace-nowrap transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100 ml-1'}`}
            >
                { label }
            </span>
        </Link>
    )
}