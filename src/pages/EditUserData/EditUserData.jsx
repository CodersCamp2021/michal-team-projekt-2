import { useEffect, useState } from 'react';
import { EditUserDataForm } from '../../components/EditUserDataForm/EditUserDataForm';
import { LayoutUserAccount } from '../../layouts/LayoutUserAccount';
import { userService } from '../../services/user';
import { Loading } from '../../components/Loading/Loading';

export const EditUserData = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    userService.getMe().then((data) => {
      const { name, lastName, photo, email, languages, dob } = data.data;
      setUserData({ name, lastName, photo, email, languages, dob });
    });
  }, []);

  return userData ? (
    <LayoutUserAccount>
      <h1>Edytuj dane</h1>
      <EditUserDataForm userData={userData} />
    </LayoutUserAccount>
  ) : (
    <Loading />
  );
};
