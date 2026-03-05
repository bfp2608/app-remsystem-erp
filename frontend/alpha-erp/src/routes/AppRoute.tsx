import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import Sidebar from '../components/sidebar/Sidebar';
import { ClientesPage } from '../pages/cliente/ClientesPage';
import { EditClientsPage } from '../pages/cliente/EditClientsPage';
import {UsuarioPage} from '../pages/usuario/UsuarioPage';
import {EditUsuarioPage} from '../pages/usuario/EditUsuarioPage';
import { PrivateRoute } from './PrivateRoute';

function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <Sidebar />
                    </PrivateRoute>
                }
            />
            {/*Por el momento los edit asi para verlos*/}
            <Route path="/clientes" element={<ClientesPage />} />
            <Route path="/clientes/edit" element={<EditClientsPage />} />
            <Route path="/usuario" element={<UsuarioPage />} />
            <Route path="/usuario/edit" element={<EditUsuarioPage />} />
        </Routes>
        </BrowserRouter>
    );

}

export default App
