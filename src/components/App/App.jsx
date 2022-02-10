import { useRoutes } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { routes } from '../Routes/Routes';

export const App = () => {
  const {
    state: { status },
  } = useAuth();
  const routing = useRoutes(routes(status));
  return <>{routing}</>;
};
