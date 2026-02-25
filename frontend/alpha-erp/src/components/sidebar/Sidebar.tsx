import { NavItem } from "./NavItem"
import { NavDropdown } from "./NavDropdown"
import { UserProfile } from "./UserProfile"
import { NAVIGATION_DATA } from "../../constans"

interface SidebarProp {
    onLogout: () => void
}

export const Sidebar = (({ onLogout } : SidebarProp) =>{
    return(
        <div className="flex h-screen overflow-hidden bg-gray-900 text-white">
            <aside className="w-64 flex flex-col bg-dark-900 border-r border-gray-600 h-full">
                <div className="h-16 flex items-center px-6 text-lg font-medium">
                    REMSYSTEMS S.A.C.
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
                                />
                            )
                        }

                        //Renderizamos un NavDropdown si es un menú con sub-items
                        if (item.type === 'dropdown') {
                            return(
                                <NavDropdown 
                                    key={ index }
                                    label={ item.label }
                                    icon= { item.icon }
                                    defaultOpen= { item.defaultOpen }
                                >
                                {/*Hacemos un segundo map para los subLinks de este menú */}
                                {item.subItems?.map((subItem, subIndex) =>(
                                    <a
                                        key={ subIndex } 
                                        href={ subItem.href}
                                        className="block px-3 py-2 pl-11 text-sm text-dark-400 hover:text-white rounded-md transition-colors"
                                    >
                                        { subItem.label }
                                    </a>
                                ))}
                                </NavDropdown>
                            )
                        }
                        return null
                    })}
                </nav>
                <UserProfile 
                    name="Nombre de usuario"
                    avatarUrl="https://unavatar.io/github"
                    onLogout={ onLogout }
                />
            </aside>
            <main className="flex-1 bg-gray-800 p-10">
                <h1 className="text-3xl font-bold text-gray-200">Contenido principal de cada item del Sidebar</h1>
            </main>
        </div>
    )
})

export default Sidebar