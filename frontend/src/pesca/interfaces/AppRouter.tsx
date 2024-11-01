import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { ViajePage } from '@/pesca/';
export const AppRouter = () => {
    return (
        <Router>
        <Routes>
            <Route path="/" element={<ViajePage/>} />
        </Routes>
        </Router>
    );
    };