import { Navigate, Outlet } from 'react-router-dom';
import { AuthStatus } from '../../helpers/authStatus';
import { Login } from '../../pages/Login';
import { Register } from '../../pages/Register';
import { Homepage } from '../../pages/HomePage/Homepage';
import { Offers } from '../../pages/Offers';
import { SingleOffer } from '../../pages/SingleOffer/SingleOffer';
import { RemindPassword } from '../../pages/RemindPassword';
import { NotFound } from '../../pages/NotFound/NotFound';
import { Account } from '../../pages/Account';
import { Reservations } from '../../pages/Reservations';
import { Loading } from '../Loading/Loading';
import { AddObject } from '../../pages/AddObject';
import { BookingSummary } from '../../pages/BookingSummary/BookingSummary';
import { PublicRoute } from './PublicRoute';

export const routes = (status) => [
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/',
    children: [
      { index: true, element: <Homepage /> },
      {
        path: 'login',
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: 'register',
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: 'remind-password',
        element: (
          <PublicRoute>
            <RemindPassword />
          </PublicRoute>
        ),
      },
    ],
  },
  {
    path: '/offers',
    children: [
      { index: true, element: <Offers /> },
      { path: ':id', element: <SingleOffer /> },
    ],
  },
  {
    path: '/account',
    element:
      status === AuthStatus.IN_PROGRESS ? (
        <Loading />
      ) : status === AuthStatus.AUTHENTICATED ? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      ),
    children: [
      {
        index: true,
        element: <Account />,
      },
      {
        path: 'reservations',
        element: <Reservations />,
      },
      { path: 'add-object', element: <AddObject /> },
    ],
  },
  {
    path: '/booking-summary',
    element: <BookingSummary />,
  },
];
