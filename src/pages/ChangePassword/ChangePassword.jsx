import { EditPasswordForm } from '../../components/EditPasswordForm.jsx/EditPasswordForm';
import { LayoutUserAccount } from '../../layouts/LayoutUserAccount';

export const ChangePassword = () => {
  const onSubmit = () => console.log('send data');
  return (
    <LayoutUserAccount>
      <h1>Zmień hasło:</h1>
      <EditPasswordForm onSubmit={onSubmit} />
    </LayoutUserAccount>
  );
};
