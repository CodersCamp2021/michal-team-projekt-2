import { Navigate, Outlet } from 'react-router-dom';
import { AuthStatus } from '../../helpers/authStatus';
import { Login } from '../../pages/Login';
import { Register } from '../../pages/Register';
import { Homepage } from '../../pages/HomePage/Homepage';
import { Offers } from '../../pages/Offers/Offers';
import { SingleOffer } from '../../pages/SingleOffer/SingleOffer';
import { RemindPassword } from '../../pages/RemindPassword';
import { NotFound } from '../../pages/NotFound/NotFound';
import { Account } from '../../pages/Account/Account';
import { Loading } from '../Loading/Loading';
import { AddObject } from '../../pages/AddObject';
import { BookingSummary } from '../../pages/BookingSummary/BookingSummary';
import { LayoutWithHeaderAndWithoutFooter } from '../../layouts/LayoutWithHeaderAndWithoutFooter';
import { LayoutWithHeaderAndFooter } from '../../layouts/LayoutWithHeaderAndFooter';
import { ChangePassword } from '../../pages/ChangePassword/ChangePassword';
import { EditUserData } from '../../pages/EditUserData/EditUserData';
import { UserReservations } from '../../pages/UserReservations/UserReservation';
import { PublicRoute } from './PublicRoute';

export const routes = (status) => [
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/',
    children: [
      {
        index: true,
        element: (
          <LayoutWithHeaderAndWithoutFooter>
            <Homepage />
          </LayoutWithHeaderAndWithoutFooter>
        ),
      },
      {
        path: 'login',
        element: (
          <LayoutWithHeaderAndFooter>
            <PublicRoute>
              <Login />
            </PublicRoute>
          </LayoutWithHeaderAndFooter>
        ),
      },
      {
        path: 'register',
        element: (
          <LayoutWithHeaderAndFooter>
            <PublicRoute>
              <Register />
            </PublicRoute>
          </LayoutWithHeaderAndFooter>
        ),
      },
      {
        path: 'remind-password',
        element: (
          <LayoutWithHeaderAndFooter>
            <PublicRoute>
              <RemindPassword />
            </PublicRoute>
          </LayoutWithHeaderAndFooter>
        ),
      },
    ],
  },
  {
    path: '/offers',
    children: [
      {
        index: true,
        element: (
          <LayoutWithHeaderAndFooter>
            <Offers />
          </LayoutWithHeaderAndFooter>
        ),
      },
      {
        path: ':id',
        element: (
          <LayoutWithHeaderAndFooter>
            <SingleOffer />
          </LayoutWithHeaderAndFooter>
        ),
      },
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
        element: (
          <LayoutWithHeaderAndFooter>
            <Account />
          </LayoutWithHeaderAndFooter>
        ),
      },
      {
        path: 'reservations',
        element: (
          <LayoutWithHeaderAndFooter>
            <UserReservations />
          </LayoutWithHeaderAndFooter>
        ),
      },
      {
        path: 'edit',
        element: (
          <LayoutWithHeaderAndFooter>
            <EditUserData />
          </LayoutWithHeaderAndFooter>
        ),
      },
      {
        path: 'password',
        element: (
          <LayoutWithHeaderAndFooter>
            <ChangePassword />
          </LayoutWithHeaderAndFooter>
        ),
      },
      {
        path: 'add-object',
        element: (
          <LayoutWithHeaderAndFooter>
            <AddObject />
          </LayoutWithHeaderAndFooter>
        ),
      },
    ],
  },
  {
    path: '/booking-summary',
    element: (
      <LayoutWithHeaderAndFooter>
        <BookingSummary />
      </LayoutWithHeaderAndFooter>
    ),
  },
];
