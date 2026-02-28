import { Routes, Route, BrowserRouter } from 'react-router-dom';
import {LoginPage} from '../pages/LoginPage';
import Sidebar from '../components/sidebar/Sidebar';
import { ClientesPage } from '../pages/ClientesPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage  />} />
                <Route path="/dashboard" element={<Sidebar />} />
                <Route path="/clientes" element={<ClientesPage />} />
            </Routes>
        </BrowserRouter>
    );

}

export default App
