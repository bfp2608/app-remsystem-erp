import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { DashboardLayout } from '../components/sidebar/DashboarLayout';
import { ClientesPage } from '../pages/cliente/ClientesPage';
import { PrivateRoute } from './PrivateRoute';
import { RUTAS } from '../constans';
import { CustomerForm } from '../pages/customerForm/CustomerForm';
import { Toaster } from 'sonner';
import { UserPage } from '../pages/usuario/UserPage';
import { UserForm } from '../pages/usuario/UserForm';

function App() {
    return (
        <>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route
                    path= {RUTAS.DASHBOARD}
                    element={
                        <PrivateRoute>
                            <DashboardLayout />
                        </PrivateRoute>
                    }
                >
                {/*Por el momento los edit asi para verlos*/}
                <Route index element={<h1 className='text-3xl font-bold'>Página de inicio del Dashboard</h1>}></Route>
                <Route path={ RUTAS.CLIENTES } element={<ClientesPage />} />
                <Route path={ RUTAS.NEW_CLIENTE } element={<CustomerForm />} />
                <Route path={ RUTAS.EDIT_CLIENTE} element={<CustomerForm />} />
                <Route path={ RUTAS.USUARIOS } element={<UserPage />} />
                <Route path={ RUTAS.NEW_USUARIO } element={<UserForm />} />
                <Route path={ RUTAS.EDIT_USUARIO} element={<UserForm />} />
                </ Route>
            </Routes>
            </BrowserRouter>
            <Toaster richColors />
        </>
    )
}

export default App