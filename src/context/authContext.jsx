import { useState, useEffect, createContext, useContext } from 'react';
import { authService } from '../services/auth';
import { signInError, signUpError } from '../helpers/validators';
import { AuthStatus } from '../helpers/authStatus';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({ status: AuthStatus.IN_PROGRESS });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setState({ status: AuthStatus.IN_PROGRESS });
    const isAuth = await authService.checkIsAuthenticated();
    if (isAuth) {
      setState({ status: AuthStatus.AUTHENTICATED });
    } else {
      setState({ status: AuthStatus.UNAUTHENTICATED });
    }
  };

  const signIn = async (credentials) => {
    try {
      const res = await authService.login(credentials);
      if (res) {
        setState({ status: AuthStatus.AUTHENTICATED });
      }
    } catch (error) {
      setState({ status: AuthStatus.ERROR, error: signInError.message });
    }
  };

  const logOut = () => {
    authService.logout();
    setState({ status: AuthStatus.UNAUTHENTICATED });
  };

  const signUp = async (credentials) => {
    try {
      const res = await authService.register(credentials);
      if (res.message) {
        setState((state) => ({ ...state, message: res.message, error: '' }));
      }
    } catch (error) {
      setState({ status: AuthStatus.ERROR, error: signUpError.message });
    }
  };
  return <AuthContext.Provider value={{ state, logOut, signIn, signUp }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('Auth context must be used within a AuthProvider');
  return context;
};
