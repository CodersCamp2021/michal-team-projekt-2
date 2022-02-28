import React from 'react';
import { Reservation } from './Reservation/Reservation';

export const UserReservations = ({ reservations }) => {
  return (
    <>
      {reservations.map((reservation) => (
        <Reservation key={reservation.id} reservation={reservation} />
      ))}
    </>
  );
};
