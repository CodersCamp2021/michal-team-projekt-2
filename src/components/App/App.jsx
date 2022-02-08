import { useRoutes } from 'react-router-dom';
import { Header } from '../Header/Header';
import { useAuth } from '../../context/authContext';
import { routes } from '../Routes/Routes';

export const App = () => {
  const {
    state: { status },
  } = useAuth();
  const routing = useRoutes(routes(status));
  return (
    <>
      <Header />
      {routing}
    </>
  );
};
