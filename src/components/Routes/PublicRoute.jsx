import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { Loading } from '../Loading/Loading';
import { AuthStatus } from '../../helpers/authStatus';

export const PublicRoute = ({ children }) => {
  const {
    state: { status },
  } = useAuth();
  return status === AuthStatus.IN_PROGRESS ? (
    <Loading />
  ) : status === AuthStatus.UNAUTHENTICATED || status === AuthStatus.ERROR ? (
    children
  ) : (
    <Navigate to="/" />
  );
};
