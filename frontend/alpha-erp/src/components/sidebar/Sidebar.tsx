import { NavItem } from "./NavItem"
import { NavDropdown } from "./NavDropdown"
import { UserProfile } from "./UserProfile"
import { NAVIGATION_DATA, RUTAS } from "../../constans"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import { LogOut, Menu } from "lucide-react"
import { useAuth } from "../../auth/useAuth"

export const Sidebar = (() =>{

    const navigate = useNavigate()
    const { logout, user } = useAuth()
    const location = useLocation()
    const [isCollapsed, setIsCollapsed] = useState(() =>{
        const savedState = localStorage.getItem('sidebarIsCollapsed')
        return savedState ? JSON.parse(savedState) : false
    })

    // useEffect(() =>{
    //     localStorage.setItem('sidebarIsCollapsed', JSON.stringify(isCollapsed))
    // }, [isCollapsed])
    
    return(
        <div className="flex h-screen overflow-hidden bg-gray-900 text-white">
            <aside 
            className={`flex flex-col bg-dark-900 border-r border-gray-600 h-full transition-all duration-200 overflow-hidden whitespace-nowrap ${isCollapsed ? 'w-16' : 'w-56'}`}
            onMouseEnter={() => setIsCollapsed(false)}
            onMouseLeave={() => setIsCollapsed(true)}
            >
                <div 
                className={`h-16 flex items-center gap-1 px-3 shrink-0 border-b border-gray-800`}
                >   
                    <button
                    className="p-2 hover:bg-gray-800 rounded-md transition-colors text-gray-400 hover:text-white"
                    >
                        <Menu />
                    </button>

                    <span className={`text-lg font-medium transition-opacity duration-300 whitespace-nowrap uppercase ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}
                    >
                        {user?.organizacion_nombre || "CARGANDO..."}
                    </span>
                </div>


                {/*Aquí es donde se hace el .map*/}
                <nav className="flex-1 px-3 space-y-1 overflow-y-auto mt-4 custom-scrollbar">
                    {NAVIGATION_DATA.map((item, index) =>{
                        if (item.type === 'link') {
                            return(
                                <NavItem 
                                    key={ index }
                                    label={ item.label }
                                    icon= { item.icon }
                                    href={ item.href }
                                    isCollapsed={isCollapsed}
                                />
                            )
                        }

                        //Renderizamos un NavDropdown si es un menú con sub-items
                        if (item.type === 'dropdown') {

                            const isChildActive = item.subItems?.some(
                                (subItem) => location.pathname === subItem.href
                            )

                            return(
                                <NavDropdown 
                                    key={ index }
                                    label={ item.label }
                                    icon= { item.icon }
                                    defaultOpen= { isChildActive || item.defaultOpen }
                                    isCollapsed={isCollapsed}
                                    onExpand={() => setIsCollapsed(false)}
                                >
                                {/*Hacemos un segundo map para los subLinks de este menú */}
                                {item.subItems?.map((subItem, subIndex) =>{

                                    const isSubActive = location.pathname === subItem.href

                                    return(
                                        <Link
                                            key={ subIndex } 
                                            to={ subItem.href }
                                            title={ subItem.label}
                                            className={`block px-3 py-2 pl-11 text-sm rounded-md transition-colors text-white ${isSubActive ? 'bg-gray-800 font-semibold' : 'text-dark-400'} `}
                                        >
                                            { subItem.label }
                                        </Link>
                                    )
                                })}
                                </NavDropdown>
                            )
                        }
                        return null
                    })}
                </nav>
                <UserProfile 
                    name={user?.nombres || "Cargando..."}
                    avatarUrl="https://unavatar.io/github/github"
                    isCollapsed={isCollapsed}
                />
                <div className={`px-2 py-2.5 mb-2 shrink-0`}>
                    <button 
                        className="flex items-center w-full py-2.5 hover:bg-gray-800 p-1 rounded-md transition-colors cursor-pointer overflow-hidden"
                        onClick = {() => {
                            logout()
                            navigate(RUTAS.LOGIN)
                        }}
                        title="Cerrar Sesión"
                    >   
                        <div className="w-10 flex justify-center shrink-0">
                            <LogOut className="h-5 w-5 shrink-0" />
                        </div>
                        <span className={`text-sm font-medium transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100 ml-1'}`}>
                            Cerrar Sesión
                        </span>
                    </button>
                </div>
            </aside>
        </div>
    )
})

export default Sidebar