import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { App } from '../framework/App'
export const AppRouter = () => {
    return (
        <Router>
        <Routes>
            <Route path="/" element={<App/>} />
        </Routes>
        </Router>
    );
    };