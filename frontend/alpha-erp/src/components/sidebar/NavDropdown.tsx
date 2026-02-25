import { FC, ReactNode, useState } from "react";

interface NavDropdownProps {
    icon: ReactNode,
    label: string,
    children: ReactNode,
    defaultOpen?: boolean
}

export const NavDropdown: FC<NavDropdownProps> = (({ icon, label, children, defaultOpen = false}) =>{
    const [isOpen, setIsOpen] = useState<boolean>(defaultOpen)

    const handleClick = () =>{
        setIsOpen(!isOpen)
    }

    return(
        <div>
            <button 
                onClick={ handleClick } 
                className="flex items-center justify-between w-full px-3 py-2.5 text-dark-400 rounded-md hover:bg-gray-800 hover:text-white group transition-colors focus:outline-none    "    
            >
                <div className="flex items-center">
                    <div className="w-5 h-5 mr-3 text-dark-400 group-hover:text-white flex items-center justify-center">
                        { icon }
                    </div>
                    <span className="text-sm font-medium">{ label }</span>
                </div>
                <svg 
                className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
            <div className={`space-y-1 mt-1 overflow-hidden transition-all duration-200 ${isOpen ? 'block' : 'hidden'}`}>
                { children }
            </div>
        </div>
    )
})