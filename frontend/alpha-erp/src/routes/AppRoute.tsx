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
import { RegisterTenantPage } from '../pages/RegisterTenantPage';
import { DashboardPage } from '../pages/DashboardPage';

function App() {
    return (
        <>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path={RUTAS.REGISTRO} element={<RegisterTenantPage />} />
                <Route
                    path= {RUTAS.DASHBOARD}
                    element={
                        <PrivateRoute>
                            <DashboardLayout />
                        </PrivateRoute>
                    }
                >
                {/*Por el momento los edit asi para verlos*/}
                <Route index element={<DashboardPage />}></Route>
                <Route path={ RUTAS.CLIENTES } element={<ClientesPage />} />
                <Route path={ RUTAS.NEW_CLIENTE } element={<CustomerForm />} />
                <Route path={ RUTAS.EDIT_CLIENTE} element={<CustomerForm />} />
                <Route path={ RUTAS.USUARIOS } element={<UserPage />} />
                <Route path={ RUTAS.NEW_USUARIO } element={<UserForm />} />
                <Route path={ RUTAS.EDIT_USUARIO} element={<UserForm />} />
                </ Route>
            </Routes>
            </BrowserRouter>
            <Toaster richColors position='top-right' expand={true}/>
        </>
    )
}

export default App