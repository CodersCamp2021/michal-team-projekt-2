import { EditUserDataForm } from '../../components/EditUserDataForm/EditUserDataForm';
import { LayoutUserAccount } from '../../layouts/LayoutUserAccount';

export const EditUserData = () => {
  const onSubmit = () => console.log('send data');
  const user = {
    id: 1,
    firstName: 'Jan',
    lastName: 'Nowak',
    photo: null,
    dob: '04.01.1989',
    email: 'jan@nowak.pl',
    languages: ['polski, angielski, niemiecki'],
  };
  return (
    <LayoutUserAccount>
      <h1>Edytuj dane</h1>
      <EditUserDataForm onSubmit={onSubmit} userData={user} />
    </LayoutUserAccount>
  );
};
