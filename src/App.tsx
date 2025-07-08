import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import PrivateRoute from './routes/PrivateRoute';

import { LoginPage } from './pages/formLogin/login';
import { MenuPage } from './pages/listagem/menu';
import { ReservationPage } from './pages/formReservation/reservation';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />

                    <Route path="/menu" element={<PrivateRoute><MenuPage /></PrivateRoute>} />

                    
                    <Route path="/reservation" element={<PrivateRoute><ReservationPage /></PrivateRoute>} />
     
                    <Route path="/" element={<PrivateRoute><MenuPage /></PrivateRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;