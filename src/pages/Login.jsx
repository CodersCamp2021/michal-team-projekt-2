import { LoginForm } from '../components/LoginForm/LoginForm';
import { useAuth } from '../context/authContext';

export function Login() {
  const { signIn } = useAuth();
  const onSubmit = (data) => {
    signIn(data);
  };
  return <LoginForm onSubmit={onSubmit} />;
}
