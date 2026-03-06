import { FC, ReactNode } from "react"
import { Link } from "react-router-dom"

interface NavItemProps {
    icon: ReactNode,
    label: string,
    href?: string
}

export const NavItem: FC<NavItemProps> = ({ icon, label, href='#'}) =>{
    return(
        <Link to={ href } className="flex items-center px-3 py-2.5 text-dark-400 rounded-md hover:bg-gray-800 hover:text-white group transition-colors">
            <div className="w-5 h-5 mr-3 text-dark-400 group-hover:text-white items-center justify-center">
                { icon }
            </div>
            <span className="text-sm font-medium">{ label }</span>
        </Link>
    )
}