import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Homepage } from '../../pages/HomePage/Homepage';
import { Login } from '../../pages/Login';
import { Register } from '../../pages/Register';
import { SingleOffer } from '../../pages/SingleOffer/SingleOffer';
import { Header } from '../Header/Header';
import { AuthProvider } from '../../context/authContext';
import { RemindPassword } from '../RemindPasswordForm/RemindPassword';
import { ReservationPage } from '../../pages/ReservationPage/ReservationPage';

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/single-offer" element={<SingleOffer />} />
          <Route exact path="/remind-password" element={<RemindPassword />} />
          <Route exact path="/reservation" element={<ReservationPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};
