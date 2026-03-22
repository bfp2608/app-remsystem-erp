import { FC } from "react"
import { Link } from "react-router-dom"

interface UserProfileProps {
    name: string, 
    avatarUrl: string,
    profileLink?: string,
    isCollapsed: boolean
}

export const UserProfile: FC<UserProfileProps> = (({ name, avatarUrl, profileLink = '#', isCollapsed }) =>{
    
    return(
        <div className={`border-t border-gray-600 p-3 shrink-0`}>
            <Link 
            to={ profileLink } 
            title={ isCollapsed ? "Ver Perfil" : ""}
            className={`flex items-center py-2.5 rounded-md hover:bg-gray-800 transition-colors overflow-hidden`} 
            >
                <div className="w-10 flex justify-center shrink-0">
                    <img 
                    src={ avatarUrl } 
                    alt={ `Avatar de ${name}` } 
                    className={`h-8 w-8 rounded-full border border-gray-600 shrink-0 overflow-cover`}
                    />
                </div>
                <div className={`flex flex-col transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100 ml-1'}`}>
                    <p className="text-sm font-medium text-white truncate whitespace-nowrap">{ name }</p>
                    <p className="text-xs text-dark-400 whitespace-nowrap">Ver perfil</p>
                </div>
            </Link>
        </div>
    )
}) 