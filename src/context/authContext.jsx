import { useState, useEffect, createContext, useContext } from 'react';
import { authService } from '../services/auth';
import { signInError, signUpError } from '../helpers/validators';
import { inProgress, unauthenticated, authenticated, statusError } from '../helpers/authStatus';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({ status: inProgress });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    setState({ status: inProgress });
    const isAuth = authService.checkIsAuthenticated();
    if (isAuth) {
      setState({ status: authenticated });
    } else {
      setState({ status: unauthenticated });
    }
  };

  const signIn = async (credentials) => {
    try {
      const res = await authService.login(credentials);
      if (res) {
        setState({ status: authenticated });
      }
    } catch (error) {
      setState({ status: statusError, error: signInError.message });
    }
  };
  const logOut = () => {
    authService.logout();
    setState({ status: unauthenticated });
  };

  const signUp = async (credentials) => {
    try {
      const res = await authService.register(credentials);
      if (res) {
        setState({ status: authenticated });
      }
    } catch (error) {
      setState({ status: statusError, error: signUpError.message });
    }
  };

  return <AuthContext.Provider value={{ state, logOut, signIn, signUp }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('Auth context must be used within a AuthProvider');
  return context;
};
