import { FC } from "react"

interface UserProfileProps {
    name: string, 
    avatarUrl: string,
    profileLink?: string
    onLogout: ()=> void
}

export const UserProfile: FC<UserProfileProps> = (({ name, avatarUrl, profileLink = '#', onLogout }) =>{
    return(
        <div className="p-4 border-t border-gray-600">
            <a href={ profileLink } className="flex items-center gap-2 w-full hover:bg-gray-800 p-2 rounded-md transition-colors">
                <img src={ avatarUrl } alt={ `Avatar de ${name}` } className="h-8 w-8 rounded-full border border-gray-600"/>
                <div>
                    <p className="text-sm font-medium text-white">{ name }</p>
                    <p className="text-xs text-dark-400">Ver perfil</p>
                </div>
            </a>
            <button 
                className="flex w-full hover:bg-gray-800 p-1 rounded-md transition-colors cursor-pointer"
                onClick={ onLogout }
            >
                <p className="text-sm font-medium pl-1.5">Cerrar Sesión</p>
            </button>
        </div>
    )
}) 