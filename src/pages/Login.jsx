import { LoginForm } from '../components/Login Form/LoginForm';
import { useAuth } from '../context/authContext';

export function Login() {
  const { signIn } = useAuth();
  const onSubmit = (data) => {
    signIn(data);
  };
  return <LoginForm onSubmit={onSubmit} />;
}
