import { ResetPasswordForm } from '../components/ResetPasswordForm/ResetPasswordForm';

export const ResetPassword = () => {
  const onSubmit = (data) => {
    console.log(data);
  };
  return <ResetPasswordForm onSubmit={onSubmit} />;
};
