import { LayoutUserAccount } from '../../layouts/LayoutUserAccount';
import { UserReservations as Reservations } from '../../components/UserReservations/UserReservations';

export const UserReservations = () => {
  const reservations = [
    {
      id: 1,
      title: 'Apartament z widokiem na morze',
      address: 'Chopina 2A, Ustka, Poland',
      price: 376,
      checkIn: '2022-03-12T15:38:12.926Z',
      checkOut: '2022-03-17T15:38:12.926Z',
      cancelDate: '2022-03-09T15:38:12.926Z',
      image:
        'https://images.unsplash.com/photo-1631048501851-4aa85ffc3be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    },
    {
      id: 2,
      title: 'Apartament 2',
      address: 'Chopina 2, Gdynia, Poland',
      price: 239,
      checkIn: '2022-03-09T15:38:12.926Z',
      checkOut: '2022-03-11T15:38:12.926Z',
      cancelDate: '2022-02-25T15:38:12.926Z',
      image:
        'https://images.unsplash.com/photo-1631048501851-4aa85ffc3be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    },
  ];
  return (
    <LayoutUserAccount>
      <h1>Rezerwacje</h1>
      <Reservations reservations={reservations} />
    </LayoutUserAccount>
  );
};
