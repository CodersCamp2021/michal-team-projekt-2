import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { Loading } from '../Loading/Loading';
import { inProgress, statusError, unauthenticated } from '../../helpers/authStatus';

export const PublicRoute = ({ children }) => {
  const {
    state: { status },
  } = useAuth();
  return status === inProgress ? (
    <Loading />
  ) : status === unauthenticated || status === statusError ? (
    children
  ) : (
    <Navigate to="/" />
  );
};
