import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Homepage } from '../../pages/Homepage';
import { Login } from '../../pages/Login';
import { Register } from '../../pages/Register';
import { Header } from '../Header/Header';

import './App.module.scss';

export const App = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};
