import { Routes, Route, BrowserRouter } from 'react-router-dom';
//import {LoginPage} from '../pages/LoginPage';
import Sidebar from '../components/sidebar/Sidebar';
import { ClientesPage } from '../pages/ClientesPage';
import { EditClientsPage } from '../pages/EditClientsPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<EditClientsPage  />} />
                <Route path="/dashboard" element={<Sidebar />} />
                <Route path="/clientes" element={<ClientesPage />} />
            </Routes>
        </BrowserRouter>
    );

}

export default App
