import { FC, ReactNode, useState } from "react";

interface NavDropdownProps {
    icon: ReactNode,
    label: string,
    children: ReactNode,
    defaultOpen?: boolean,
    isCollapsed?: boolean,
    onExpand: () => void
}

export const NavDropdown: FC<NavDropdownProps> = (({ 
    icon,
    label,
    children,
    defaultOpen = false,
    isCollapsed= false,
    onExpand
    }) =>{

    const [isOpen, setIsOpen] = useState<boolean>(defaultOpen)

    const handleClick = () =>{
        if(isCollapsed && onExpand){
            onExpand()
            setIsOpen(true)
        } else{
            setIsOpen(!isOpen)
        }
    }

    return(
        <div>
            <button 
                onClick={ handleClick } 
                title={ isCollapsed ? label : ''}
                className={`flex items-center justify-between w-full py-2.5 text-dark-400 rounded-md focus:outline-none overflow-hidden hover:bg-gray-800`}
            >
                <div className="flex items-center">
                    <div className={`w-10 flex justify-center shrink-0`}>
                        { icon }
                    </div>
                    <span className={`text-sm font-medium transition-opacity duration-300 whitespace-nowrap ${isCollapsed ? 'opacity-0' : 'opacity-100 ml-1'}`} >{ label }</span>
                </div>

                <svg 
                className={`shrink-0 w-4 h-4 mr-2 transition-all duration-300 ${isOpen ? 'rotate-90' : ''} ${isCollapsed ? 'opacity-0' : 'opacity-100'}`} 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
            
            <div className={`space-y-1 mt-1 overflow-hidden transition-all duration-200 ${isOpen && !isCollapsed ? 'block' : 'hidden'}`}>
                { children }
            </div>
        </div>
    )
})