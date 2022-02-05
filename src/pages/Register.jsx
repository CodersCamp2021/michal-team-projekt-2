import { RegisterForm } from '../components/RegisterForm/RegisterForm';
import { useAuth } from '../context/authContext';

export function Register() {
  const { signUp } = useAuth();
  const onSubmit = (data) => {
    signUp(data);
  };
  return <RegisterForm onSubmit={onSubmit} />;
}
