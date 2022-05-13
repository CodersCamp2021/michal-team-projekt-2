import { useEffect, useState } from 'react';
import { LayoutUserAccount } from '../../layouts/LayoutUserAccount';
import { UserReservations as Reservations } from '../../components/UserReservations/UserReservations';
import { axiosClient } from '../../helpers/axiosClient';

const getReservations = async () => {
  try {
    const { data } = (await axiosClient.get(`/user/me/reservations`)).data;
    return data;
  } catch (e) {
    throw new Error('Something went wrong');
  }
};

export const UserReservations = () => {
  const [reservations, setReservations] = useState(null);
  useEffect(() => getReservations().then((data) => setReservations(data)), []);

  return (
    <LayoutUserAccount>
      <h1>Rezerwacje</h1>
      {reservations ? <Reservations reservations={reservations} /> : <p>No reservations</p>}
    </LayoutUserAccount>
  );
};
