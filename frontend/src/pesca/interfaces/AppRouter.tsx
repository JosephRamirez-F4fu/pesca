import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { ViajePage,FlotaPage } from '@/pesca/interfaces/pages';
export const AppRouter = () => {
    return (
        <Router>
        <Routes>
            <Route path="/viaje" element={<ViajePage/>} />
            <Route path="/flota" element={<FlotaPage/>} />
            <Route path="*" element={<div>Not Found</div>} />
        </Routes>
        </Router>
    );
    };