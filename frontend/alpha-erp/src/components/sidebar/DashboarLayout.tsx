import { Outlet } from "react-router-dom"
import { Sidebar } from "../sidebar/Sidebar"

export const DashboardLayout = () =>{
    return(
        <div className="flex h-screen overflow-hidden bg-gray-900 text-white">
            <Sidebar />
            <main className="flex-1 bg-gray-800 overflow-y-auto custom-scrollbar">
                <Outlet />
            </main>
        </div>
    )
}