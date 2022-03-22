import { useEffect, useState } from 'react';
import { EditPasswordForm } from '../../components/EditPasswordForm.jsx/EditPasswordForm';
import { LayoutUserAccount } from '../../layouts/LayoutUserAccount';
import { userService } from '../../services/user';
import { Loading } from '../../components/Loading/Loading';

export const ChangePassword = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    userService.getMe().then((data) => {
      const { password } = data.data;
      setUserData({ password });
    });
  }, []);

  return userData ? (
    <LayoutUserAccount>
      <h1>Zmień hasło:</h1>
      <EditPasswordForm userData={userData} />
    </LayoutUserAccount>
  ) : (
    <Loading />
  );
};
