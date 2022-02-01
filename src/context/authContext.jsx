import { useState, useEffect, createContext, useContext } from 'react';
import { authService } from '../services/auth';
import { signInError, signUpError } from '../helpers/validators';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const isAuth = authService.checkIsAuthenticated();
    setIsAuthenticated(isAuth);
  };

  const signIn = (credentials) => {
    authService
      .login(credentials)
      .then((res) => {
        if (res) setIsAuthenticated(true);
      })
      .catch((error) => {
        setError(signInError.message);
        setIsAuthenticated(false);
      });
  };
  const logOut = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  const signUp = (credentials) => {
    authService
      .register(credentials)
      .then((res) => {
        if (res) setIsAuthenticated(true);
      })
      .catch((error) => {
        setError(signUpError.message);
        setIsAuthenticated(false);
      });
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, logOut, signIn, signUp, error }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('Auth context must be used within a AuthProvider');
  return context;
};
